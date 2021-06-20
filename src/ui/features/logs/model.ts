import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import ipc from '../../ipc';
import type { Log } from '../../../types/logs';
import { ipcListLogs } from '../../../types/logs';
import type { SearchParams } from '../../../types/search';

// stores
export const $logs = createStore<Log[]>([]);

// events

// effects

export const fetchLogsFx = createEffect<SearchParams[], Log[]>(async (params) =>
  ipc().invoke(ipcListLogs, params)
);

export const logsGate = createGate();

// logic

forward({
  // @ts-ignore
  from: logsGate.open,
  to: fetchLogsFx,
});

forward({
  from: fetchLogsFx.doneData,
  to: $logs,
});
