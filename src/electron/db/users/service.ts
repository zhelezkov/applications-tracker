import db from 'better-sqlite3-helper';
import type { User } from '../../../types/user';
import { makeService } from '../utils';

export const usersService = makeService({
  listUsers: () => {
    return db().query<User>('select * from users');
  },
});
