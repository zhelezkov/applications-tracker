import db from 'better-sqlite3-helper';
import type { User } from '../../../types/user';

export function listUsers(): User[] {
  return db().query<User>('select * from users');
}
