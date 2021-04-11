import { ipcRenderer } from 'electron';

console.log('preload', ipcRenderer)

// @ts-ignore
window.ipcRenderer = ipcRenderer;
