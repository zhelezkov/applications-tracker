import type { IpcRenderer } from 'electron';

export default function ipc(): IpcRenderer {
  return (window as any).ipcRenderer;
}
