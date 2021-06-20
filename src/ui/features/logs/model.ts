import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ipcInvoke } from '../../ipc';
import type { Log } from '../../../types/logs';
import { ipcListLogs, ipcListLogsForOrder } from '../../../types/logs';
import type { SearchParams } from '../../../types/search';

// stores
export const $logs = createStore<Log[]>([]);

// events

// effects

export const fetchLogsFx = createEffect(
  ({ searchParams = [] }: { searchParams?: SearchParams[] }) =>
    ipcInvoke<Log[]>(ipcListLogs, searchParams)
);

export const fetchLogsForOrderFx = createEffect(
  ({
    orderId,
    searchParams = [],
  }: {
    orderId: number;
    searchParams?: SearchParams[];
  }) => ipcInvoke<Log[]>(ipcListLogsForOrder, orderId, searchParams)
);

export const logsGate = createGate<{ searchParams?: SearchParams[] }>();

// logic

forward({
  from: logsGate.open,
  to: fetchLogsFx,
});

forward({
  from: fetchLogsFx.doneData,
  to: $logs,
});

forward({
  from: fetchLogsForOrderFx.doneData,
  to: $logs,
});
