import ipc from './ipc';

export interface Order {
  id: number;
}

export async function loadOrdersList(): Promise<Order[]> {
  return ipc().invoke('loadOrdersList');
}
