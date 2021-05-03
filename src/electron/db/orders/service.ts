import db from 'better-sqlite3-helper';
import type { Order } from '../../../types/order';
import { makeService } from '../utils';

export const ordersService = makeService({
  loadOrdersList: () => {
    return db().query<Order>('select * from orders');
  },
});
