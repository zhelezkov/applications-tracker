import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { keyBy } from 'lodash';
import { loadOrdersList } from '../../../types/order';
import type { Order } from '../../../types/order';

export const $orders = createStore<Order[]>([]);

export const $ordersById = $orders.map((orders) =>
  keyBy(orders, (order) => order.id)
);

export const fetchOrdersFx = createEffect(async () => loadOrdersList());

export const ordersGate = createGate();

forward({
  from: ordersGate.open,
  to: fetchOrdersFx,
});

forward({
  from: fetchOrdersFx.doneData,
  to: $orders,
});
