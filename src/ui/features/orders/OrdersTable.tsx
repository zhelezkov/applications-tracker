import { Table, TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useStore } from 'effector-react';
import { useCallback, useMemo } from 'react';
import { $orders, Order } from '../../../models/order';

import styles from './OrdersTable.module.css';

const columns: ColumnsType<Order> = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Название',
    dataIndex: ['attributes', 'title'],
  },
  {
    title: 'Статус',
    dataIndex: ['attributes', 'status'],
  },
];

const HEADER_HEIGHT = 55;
const ROW_HEIGHT = 55;
const FOOTER_HEIGHT = 64;

interface OrdersTableProps {
  height: number;
  onRowClick?: (order: Order) => void;
}

const OrdersTable = ({ height, onRowClick }: OrdersTableProps) => {
  const orders = useStore($orders);

  const paginationConfig: TablePaginationConfig = useMemo(
    () => ({
      pageSize: Math.floor(
        (height - HEADER_HEIGHT - FOOTER_HEIGHT) / ROW_HEIGHT
      ),
    }),
    [height]
  );

  const handleRowEnchantment = useCallback(
    (order: Order) => {
      return {
        onClick: () => {
          onRowClick?.(order);
        },
      };
    },
    [onRowClick]
  );

  return (
    <Table<Order>
      pagination={paginationConfig}
      columns={columns}
      dataSource={orders}
      onRow={handleRowEnchantment}
      rowClassName={styles.row}
      rowKey={(order) => order.id}
    />
  );
};

export default OrdersTable;
