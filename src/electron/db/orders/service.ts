import db from 'better-sqlite3-helper';
import { pickBy } from 'lodash';
import type { Order, OrderAttributes } from '../../../types/order';
import {
  ipcListOrders,
  ipcNewOrder,
  ipcUpdateOrder,
} from '../../../types/order';
import { makeService } from '../utils';
import { findAttributesDiff } from './utils';

function newOrder(): number {
  return db().run('insert into orders default values')
    .lastInsertRowid as number;
}

function listOrders(): Record<string, Order> {
  const ordersRows = db().query(
    'select id, attribute_id, value from orders join orders_av oa on orders.id = oa.order_id'
  );
  return ordersRows.reduce((acc, row) => {
    const { id, value, attribute_id: attributeId } = row;
    if (!acc[id]) {
      acc[id] = {
        id,
        attributes: {},
      };
    }
    acc[id].attributes[attributeId] = JSON.parse(value);
    return acc;
  }, {} as Record<string, Order>);
}

function loadOrder(id: number): Order {
  const orderRows = db().query(
    'select id, attribute_id, value from orders join orders_av oa on orders.id = oa.order_id where id = ?',
    id
  );
  return orderRows.reduce(
    (acc: Order, row) => {
      const { value, attribute_id: attributeId } = row;
      acc.attributes![attributeId] = JSON.parse(value);
      return acc;
    },
    { id: id, attributes: {} } as Order
  );
}

function insertAttributes(
  updatedBy: number,
  orderId: number,
  attributes: OrderAttributes
) {
  const now = Date.now();
  const prepared = db().prepare(
    'insert into orders_av(order_id, attribute_id, value, last_updated_by, last_updated_at) values (?, ?, ?, ?, ?)'
  );

  runWithAttributes(attributes, (attributeId, value) =>
    prepared.run(orderId, attributeId, value, updatedBy, now)
  );
}

function updateAttributes(
  updatedBy: number,
  orderId: number,
  attributes: OrderAttributes
) {
  const now = Date.now();
  const prevData = loadOrder(orderId);
  const diff = findAttributesDiff(prevData.attributes || {}, attributes);
  diff.new.forEach((attId) => {
    const value = JSON.stringify(attributes[attId]);
    db().run(
      `insert into orders_av(order_id, attribute_id, value, last_updated_by, last_updated_at)
       values (?, ?, ?, ?, ?)`,
      orderId,
      attId,
      value,
      updatedBy,
      now
    );
  });

  diff.modified.forEach((attId) => {
    const value = JSON.stringify(attributes[attId]);
    db().run(
      'update orders_av set value=?,last_updated_by=?,last_updated_at=? where order_id=? and attribute_id=?',
      value,
      updatedBy,
      now,
      orderId,
      attId
    );
  });
}

function runWithAttributes(
  attributes: OrderAttributes,
  preparedStmtRunner: (attributeId: string, value: string) => void
) {
  Object.entries(attributes).forEach(([id, value]) => {
    preparedStmtRunner(id, JSON.stringify(value));
  });
}

export const ordersService = makeService({
  [ipcListOrders]: () => {
    return listOrders();
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
