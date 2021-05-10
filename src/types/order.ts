export type OrderAttributes = Record<string, any>;

export interface Order {
  id: number;
  attributes?: OrderAttributes;
}

export const ipcNewOrder = 'newOrder';
