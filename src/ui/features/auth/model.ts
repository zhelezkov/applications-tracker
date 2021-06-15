import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
} from 'effector';
import { createGate } from 'effector-react';
import { keyBy } from 'lodash';
import type { User } from '../../../types/user';
import { ipcListUsers } from '../../../types/user';
import ipc from '../../ipc';

export const usersGate = createGate();

// events
export const userSelected = createEvent<number>();

// effects
export const fetchUsersFx = createEffect<void, User[]>(async () =>
  ipc().invoke(ipcListUsers)
);

// stores

export const $users = createStore<User[]>([]).on(
  fetchUsersFx.doneData,
  (_, users) => users
);

export const $usersById = $users.map((users) =>
  keyBy(users, (user) => user.id)
);

export const $currentUserId = createStore<number | null>(null).on(
  userSelected,
  (_, userId) => userId
);

export const $currentUser = combine(
  $usersById,
  $currentUserId,
  (users, currentUserId) => (currentUserId ? users[currentUserId] : null)
);

export const $isAuthenticated = $currentUserId.map((id) => id !== null);

// logic

forward({
  from: usersGate.open,
  to: fetchUsersFx,
});
