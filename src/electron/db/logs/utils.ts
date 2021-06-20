import type { SearchParams } from '../../../types/search';

export function generateFilterClause(params: SearchParams[]): string {
  return params.reduce((str, curParams, index) => {
    let res = ` ${str} orders_log.attribute_id='${curParams.field}' and (from_value like '%${curParams.value}%' or to_value like '%${curParams.value}%')`;
    if (index !== params.length - 1) {
      res += ' or';
    }
    return res;
  }, 'where ');
}
