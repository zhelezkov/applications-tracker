import ipc from './ipc';

export interface OrderAttribute {
  id: string;
  value: any;
}

export interface Order {
  id: number;
  attributes?: OrderAttribute;
}

export async function loadOrdersList(): Promise<Order[]> {
  return ipc().invoke('loadOrdersList');
}
