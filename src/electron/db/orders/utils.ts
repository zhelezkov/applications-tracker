import { isEqual } from 'lodash';
import type { OrderAttributes } from '../../../types/order';

export function findAttributesDiff(from: OrderAttributes, to: OrderAttributes) {
  const diff = {
    new: [] as string[],
    deleted: [] as string[],
    modified: [] as string[],
  };
  Object.entries(to).forEach(([key, value]) => {
    if (typeof from[key] === 'undefined') {
      diff.new.push(key);
    }
  });
  Object.entries(from).forEach(([key, value]) => {
    if (typeof to[key] === 'undefined') {
      diff.deleted.push(key);
      return;
    }
    if (!isEqual(from[key], to[key])) {
      diff.modified.push(key);
    }
  });
  return diff;
}
