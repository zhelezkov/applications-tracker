import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { attach } from 'effector/effector.cjs';
import { ipcNewOrder } from '../../../types/order';
import type { Order, OrderAttributes } from '../../../types/order';
import ipc from '../../ipc';
import { $currentUserId } from '../auth/model';

// stores

export const $ordersById = createStore<Record<string, Order>>({});

export const $orders = $ordersById.map((orders) => Object.values(orders));

//events

// effects

export const fetchOrdersFx = createEffect<void, Record<string, Order>>(
  async () => ipc().invoke('listOrders')
);

export const newOrderFx = attach({
  effect: createEffect<{ userId: number; attributes: OrderAttributes }, number>(
    async ({ userId, attributes }) =>
      ipc().invoke(ipcNewOrder, userId, attributes)
  ),
  source: $currentUserId,
  mapParams: (attributes: OrderAttributes, userId) => {
    return { userId: userId!, attributes };
  },
});

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
