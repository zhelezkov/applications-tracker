import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { IpcRenderer } from 'electron';

import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function useIpc(): IpcRenderer {
  return (window as any).ipcRenderer;
}
