import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { keyBy } from 'lodash';
import ipc from '../ipc';

export interface OrderAttribute {
  id: string;
  value: any;
}

export interface Order {
  id: number;
  attributes?: OrderAttribute;
}

export const $orders = createStore<Order[]>([]);

export const $ordersById = $orders.map((orders) =>
  keyBy(orders, (order) => order.id)
);

export const fetchOrdersFx = createEffect<void, Order[]>(async () =>
  ipc().invoke('loadOrdersList')
);

export const ordersGate = createGate();

forward({
  from: ordersGate.open,
  to: fetchOrdersFx,
});

forward({
  from: fetchOrdersFx.doneData,
  to: $orders,
});
