import { makeService } from '../utils';
import { ipcListLogs, Log } from '../../../types/logs';
import db from 'better-sqlite3-helper';

function listLogs(): Log[] {
  const logsRows = db().query(
    `select order_id,
            attribute_id,
            updated_at,
            updated_by,
            from_value,
            to_value,
            (to_value = orders_av.value) as is_actual
     from orders_log
              join orders_av using (order_id, attribute_id)
     order by updated_at desc`
  );

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

export const logsService = makeService({
  [ipcListLogs]: () => {
    return listLogs();
  },
});
