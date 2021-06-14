import { Table, TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useStore } from 'effector-react';
import { useCallback, useMemo } from 'react';
import type { Log } from '../../../types/logs';

import styles from './LogsTable.module.css';
import { $logs } from './model';
import { $attributesById } from '../schema/model';

const renderValue = (value: any) => {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value.toString();
};

const columns: ColumnsType<Log> = [
  {
    title: 'id заказа',
    dataIndex: 'orderId',
  },
  {
    title: 'поле',
    dataIndex: 'attributeId',
    render: (value) => {
      const attributes = $attributesById.getState();
      return attributes[value].name;
    },
  },
  {
    title: 'прежнее значение',
    dataIndex: 'fromValue',
    render: renderValue,
  },
  {
    title: 'новое значение',
    dataIndex: 'toValue',
    render: renderValue,
  },
];

const HEADER_HEIGHT = 55;
const ROW_HEIGHT = 55;
const FOOTER_HEIGHT = 64;

interface LogsTableProps {
  height: number;
  onRowClick?: (log: Log) => void;
}

const LogsTable = ({ height, onRowClick }: LogsTableProps) => {
  const logs = useStore($logs);

  const paginationConfig: TablePaginationConfig = useMemo(
    () => ({
      pageSize: Math.floor(
        (height - HEADER_HEIGHT - FOOTER_HEIGHT) / ROW_HEIGHT
      ),
    }),
    [height]
  );

  const handleRowEnchantment = useCallback(
    (log: Log) => {
      return {
        onClick: () => {
          onRowClick?.(log);
        },
      };
    },
    [onRowClick]
  );

  return (
    <Table<Log>
      pagination={paginationConfig}
      columns={columns}
      dataSource={logs}
      onRow={handleRowEnchantment}
      rowClassName={styles.row}
      rowKey={(log) =>
        `${log.orderId}-${log.attributeId}-${log.updatedBy}-${log.updatedAt}`
      }
    />
  );
};

export default LogsTable;
