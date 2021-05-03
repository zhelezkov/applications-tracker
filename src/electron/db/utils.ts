import { wrapToIpc } from '../ipc/utils';

export function makeService(actions: Record<string, (...args: any) => any>) {
  return Object.entries(actions).map(([name, fn]) => ({
    name,
    fn: wrapToIpc(fn),
  }));
}
