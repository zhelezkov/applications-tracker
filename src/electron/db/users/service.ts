import db from 'better-sqlite3-helper';
import type { User } from '../../../types/user';
import { ipcListUsers } from '../../../types/user';
import { makeService } from '../utils';

export const usersService = makeService({
  [ipcListUsers]: () => {
    return db().query<User>('select id, name, password, role from users');
  },
});
