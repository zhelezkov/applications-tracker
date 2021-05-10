import db from 'better-sqlite3-helper';
import { pickBy } from 'lodash';
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
    'insert into orders_av(order_id, attribute_id, value, last_updated_by, last_updated_at) VALUES (?, ?, ?, ?, ?)'
  );

  runWithAttributes(attributes, (attributeId, value) =>
    prepared.run(orderId, attributeId, value, updatedBy, Date.now())
  );
}

function updateAttributes(
  updatedBy: number,
  orderId: number,
  attributes: OrderAttributes
) {
  const prepared = db().prepare(
    'update orders_av set value = ?, last_updated_by = ?, last_updated_at = ? where attribute_id = ? and order_id = ?'
  );

  runWithAttributes(attributes, (attributeId, value) =>
    prepared.run(value, updatedBy, Date.now(), attributeId, orderId)
  );
}

function runWithAttributes(
  attributes: OrderAttributes,
  preparedStmtRunner: (attributeId: string, value: string) => void
) {
  Object.entries(attributes).forEach(([id, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        preparedStmtRunner(id, val);
      });
      return;
    }
    preparedStmtRunner(id, value);
  });
}

export const ordersService = makeService({
  listOrders: () => {
    const ordersRows = db().query(
      'select id, attribute_id, value from orders join orders_av oa on orders.id = oa.order_id'
    );
    return ordersRows.reduce((acc, row) => {
      const { id, value, attribute_id: attributeId } = row;
      if (!acc[id]) {
        acc[id] = {
          id,
          attributes: { [attributeId]: value },
        };
        return acc;
      }
      if (typeof acc[id].attributes[attributeId] !== 'undefined') {
        const attributes = acc[id].attributes;
        const attrVal = attributes[attributeId];
        if (Array.isArray(attrVal)) {
          attributes[attributeId] = [...attrVal, value];
          return acc;
        }
        acc[id].attributes[attributeId] = [attrVal, value];
        return acc;
      }
      acc[id].attributes[attributeId] = value;
      return acc;
    }, {} as Record<string, Order>);
  },
  newOrder: (userId: number, attributes: OrderAttributes) => {
    const orderId = newOrder();
    const validAttributes = pickBy(attributes, (value) => value !== undefined);
    insertAttributes(userId, orderId, validAttributes);
    return orderId;
  },
  updateOrder: (userId: number, order: Order) => {
    const validAttributes = pickBy(
      order?.attributes || {},
      (value) => value !== undefined
    );
    updateAttributes(userId, order.id, validAttributes);
  },
});
