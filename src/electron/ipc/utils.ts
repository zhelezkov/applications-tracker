import type { IpcMainInvokeEvent } from 'electron';

export function wrapToIpc<T>(fn: (request: any) => T) {
  return (event: IpcMainInvokeEvent, request: any) => {
    return fn(request);
  };
}
