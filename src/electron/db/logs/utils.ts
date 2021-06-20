import type { SearchParams } from '../../../types/search';

export function generateFilterClause(params: SearchParams[]): string {
  return params.reduce((str, curParams, index) => {
    let res = ` ${str} orders_log.attribute_id=? and (from_value like ? or to_value like ?)`;
    if (index !== params.length - 1) {
      res += ' or';
    }
    return res;
  }, '');
}
