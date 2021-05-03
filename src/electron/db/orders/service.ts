import db from 'better-sqlite3-helper';
import { pickBy } from 'lodash';
import type { Order, OrderAttributes } from '../../../models/order';
import { makeService } from '../utils';

function newOrder(): number {
  return db().run('insert into orders default values')
    .lastInsertRowid as number;
}

function insertAttributes(orderId: number, attributes: OrderAttributes) {
  const prepared = db().prepare(
    'insert into orders_av(order_id, attribute_id, value) VALUES (?, ?, ?)'
  );

  Object.entries(attributes).forEach(([id, value]) => {
    prepared.run(orderId, id, value);
  });
}

function updateAttributes(orderId: number, attributes: OrderAttributes) {
  const prepared = db().prepare(
    'update orders_av set value = ? where order_id = ? and attribute_id = ?'
  );

  Object.entries(attributes).forEach(([id, value]) => {
    prepared.run(value, orderId, id);
  });
}

export const ordersService = makeService({
  listOrders: () => {
    const ordersRows = db().query(
      'select id, attribute_id, value from orders join orders_av oa on orders.id = oa.order_id'
    );
    return ordersRows.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          attributes: { [row.attribute_id]: row.value },
        };
        return acc;
      }
      acc[row.id].attributes[row.attribute_id] = row.value;
      return acc;
    }, {} as Record<string, Order>);
  },
  newOrder: (attributes: OrderAttributes) => {
    const orderId = newOrder();
    const validAttributes = pickBy(attributes, (value) => value !== undefined);
    insertAttributes(orderId, validAttributes);
    return orderId;
  },
  updateOrder: (order: Order) => {
    const validAttributes = pickBy(
      order?.attributes || {},
      (value) => value !== undefined
    );
    updateAttributes(order.id, validAttributes);
  },
});
