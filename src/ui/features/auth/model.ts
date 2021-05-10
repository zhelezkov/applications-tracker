import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
} from 'effector';
import { createGate } from 'effector-react';
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

export const $currentUserId = createStore<number | null>(null).on(
  userSelected,
  (_, userId) => userId
);

export const $currentUser = combine(
  $users,
  $currentUserId,
  (users, currentUserId) => users.find(({ id }) => id === currentUserId)
);

export const $isAuthenticated = $currentUserId.map((id) => id !== null);

// logic

forward({
  from: usersGate.open,
  to: fetchUsersFx,
});
