import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import ipc from '../ipc';

// types

export type OrderAttributes = Record<string, any>;

export interface Order {
  id: number;
  attributes?: OrderAttributes;
}

// stores

export const $ordersById = createStore<Record<string, Order>>({});

export const $orders = $ordersById.map((orders) => Object.values(orders));

//events

// effects

export const fetchOrdersFx = createEffect<void, Record<string, Order>>(
  async () => ipc().invoke('listOrders')
);

export const newOrderFx = createEffect<OrderAttributes, number>(
  async (attributes) => ipc().invoke('newOrder', attributes)
);

export const updateOrderFx = createEffect<Order, void>(async (order) =>
  ipc().invoke('updateOrder', order)
);

export const ordersGate = createGate();

// logic

forward({
  from: ordersGate.open,
  to: fetchOrdersFx,
});

forward({
  from: fetchOrdersFx.doneData,
  to: $ordersById,
});

forward({
  from: newOrderFx.done,
  to: fetchOrdersFx,
});

forward({
  from: updateOrderFx.done,
  to: fetchOrdersFx,
});
