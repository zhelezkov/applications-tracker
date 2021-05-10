import db from 'better-sqlite3-helper';
import { pickBy } from 'lodash';
import { ipcNewOrder, ipcUpdateOrder } from '../../../types/order';
import type { Order, OrderAttributes } from '../../../types/order';
import { makeService } from '../utils';

function newOrder(): number {
  return db().run('insert into orders default values')
    .lastInsertRowid as number;
}

function insertAttributes(
  updatedBy: number,
  orderId: number,
  attributes: OrderAttributes
) {
  const prepared = db().prepare(
    'insert into orders_av(order_id, attribute_id, value, is_array, array_index, last_updated_by, last_updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  runWithAttributes(attributes, (attributeId, value, isArray, index) =>
    prepared.run(
      orderId,
      attributeId,
      value,
      isArray,
      index,
      updatedBy,
      Date.now()
    )
  );
}

function updateAttributes(
  updatedBy: number,
  orderId: number,
  attributes: OrderAttributes
) {
  // first clear fields
  db().run('delete from orders_av where order_id = ?', orderId);
  insertAttributes(updatedBy, orderId, attributes);
}

function runWithAttributes(
  attributes: OrderAttributes,
  preparedStmtRunner: (
    attributeId: string,
    value: string,
    isArray: number,
    index: number | null
  ) => void
) {
  Object.entries(attributes).forEach(([id, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val, idx) => {
        preparedStmtRunner(id, val, 1, idx);
      });
      return;
    }
    preparedStmtRunner(id, value, 0, null);
  });
}

export const ordersService = makeService({
  listOrders: () => {
    const ordersRows = db().query(
      'select id, attribute_id, value, is_array, array_index from orders join orders_av oa on orders.id = oa.order_id'
    );
    return ordersRows.reduce((acc, row) => {
      const {
        id,
        value,
        attribute_id: attributeId,
        is_array: isArray,
        array_index: arrayIndex,
      } = row;
      if (!acc[id]) {
        acc[id] = {
          id,
          attributes: {},
        };
      }
      if (Array.isArray(acc[id].attributes[attributeId])) {
        const arr = acc[id].attributes[attributeId] as string[];
        arr.splice(arrayIndex, 0, value);
        return acc;
      }
      acc[id].attributes[attributeId] = isArray ? [value] : value;
      return acc;
    }, {} as Record<string, Order>);
  },
  [ipcNewOrder]: (userId: number, attributes: OrderAttributes) => {
    const validAttributes = pickBy(attributes, (value) => value !== undefined);
    const run = db().transaction(() => {
      const orderId = newOrder();
      insertAttributes(userId, orderId, validAttributes);
      return orderId;
    });
    return run();
  },
  [ipcUpdateOrder]: (userId: number, order: Order) => {
    const validAttributes = pickBy(
      order?.attributes || {},
      (value) => value !== undefined
    );
    const run = db().transaction(() => {
      updateAttributes(userId, order.id, validAttributes);
    });
    run();
  },
});
