import ipc from './ipc';

export interface Order {
  id: number;
}

export async function listOrders(): Promise<Order[]> {
  return ipc().invoke('listOrders');
}
