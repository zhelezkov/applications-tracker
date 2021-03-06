export type OrderAttributes = Record<string, any>;

export interface Order {
  id: number;
  attributes?: OrderAttributes;
}

export const ipcNewOrder = 'newOrder';
export const ipcUpdateOrder = 'updateOrder';
export const ipcListOrders = 'listOrders';
