import type { IpcRenderer } from 'electron';

export default function ipc(): IpcRenderer {
  return (window as any).ipcRenderer;
}

export function ipcInvoke<T>(channel: string, ...args: any[]): Promise<T> {
  return ipc().invoke(channel, ...args);
}
