import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import ipc from '../../ipc';
import type { Log } from '../../../types/logs';
import { ipcListLogs } from '../../../types/logs';

// stores
export const $logs = createStore<Log[]>([]);

// events

// effects

export const fetchLogsFx = createEffect<void, Log[]>(async () =>
  ipc().invoke(ipcListLogs)
);

export const logsGate = createGate();

// logic

forward({
  from: logsGate.open,
  to: fetchLogsFx,
});

forward({
  from: fetchLogsFx.doneData,
  to: $logs,
});
