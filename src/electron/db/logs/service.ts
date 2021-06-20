import { makeService } from '../utils';
import { ipcListLogs, ipcListLogsForOrder, Log } from '../../../types/logs';
import db from 'better-sqlite3-helper';
import type { SearchParams } from '../../../types/search';
import { generateFilterClause } from './utils';

function queryLogs(query: string, params: any[] = []): Log[] {
  const logsRows = db().query(query, ...params);

  return logsRows.map((row) => ({
    orderId: row.order_id,
    attributeId: row.attribute_id,
    isActual: Boolean(row.is_actual),
    updatedAt: new Date(row.updated_at),
    updatedBy: row.updated_by,
    fromValue: JSON.parse(row.from_value),
    toValue: JSON.parse(row.to_value),
  }));
}

function listLogs(searchParams: SearchParams[] = []): Log[] {
  const queryParams: any[] = [];
  let query = `select order_id,
                      attribute_id,
                      updated_at,
                      updated_by,
                      from_value,
                      to_value,
                      (to_value = orders_av.value) as is_actual
               from orders_log
                        join orders_av using (order_id, attribute_id)`;

  if (searchParams.length) {
    query += ` where ${generateFilterClause(searchParams)} `;
    queryParams.push(
      ...searchParams.flatMap((it) => [
        it.field,
        `%${it.value}%`,
        `%${it.value}%`,
      ])
    );
  }

  query += ' order by updated_at desc ';

  return queryLogs(query, queryParams);
}

function listLogsForOrder(orderId: number, searchParams: SearchParams[]) {
  const queryParams: any[] = [orderId];
  let query = `select order_id,
                      attribute_id,
                      updated_at,
                      updated_by,
                      from_value,
                      to_value,
                      (to_value = orders_av.value) as is_actual
               from orders_log
                        join orders_av using (order_id, attribute_id)
               where order_id = ?`;

  if (searchParams.length) {
    query += ` and ${generateFilterClause(searchParams)} `;
    queryParams.push(
      ...searchParams.flatMap((it) => [
        it.field,
        `%${it.value}%`,
        `%${it.value}%`,
      ])
    );
  }

  query += ' order by updated_at desc ';

  return queryLogs(query, queryParams);
}

export const logsService = makeService({
  [ipcListLogs]: (params: SearchParams[] = []) => {
    return listLogs(params);
  },
  [ipcListLogsForOrder]: (orderId: number, params: SearchParams[] = []) => {
    return listLogsForOrder(orderId, params);
  },
});
