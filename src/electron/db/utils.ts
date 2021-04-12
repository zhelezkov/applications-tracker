import { wrapToIpc } from '../ipc/utils';

export function makeService(actions: Record<string, () => any>) {
  return Object.entries(actions).map(([name, fn]) => ({
    name,
    fn: wrapToIpc(fn),
  }));
}
