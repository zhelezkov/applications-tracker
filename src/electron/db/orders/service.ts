import db from 'better-sqlite3-helper';
import type { User } from '../../../types/user';
import { makeService } from '../utils';

export const ordersService = makeService({
  listOrders: () => {
    return db().query<User>('select * from orders');
  },
});
