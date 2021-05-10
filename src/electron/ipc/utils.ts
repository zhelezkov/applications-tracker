import type { IpcMainInvokeEvent } from 'electron';

export function wrapToIpc<T>(fn: (...args: any) => T) {
  return (event: IpcMainInvokeEvent, ...args: any) => {
    return fn(...args);
  };
}
