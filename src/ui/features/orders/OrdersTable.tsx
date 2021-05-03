import { Table, TablePaginationConfig } from 'antd';
import { useStore } from 'effector-react';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { $orders } from './model';

const columns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: 'Название',
    dataIndex: 'title',
  },
  {
    title: 'Статус',
    key: 'status',
    dataIndex: 'status',
  },
];

function genOrders(
  size: number
): { id: string; title: string; status: string }[] {
  const arr = new Array(size).fill(null);
  return arr.map(() => ({ id: nanoid(), title: nanoid(), status: nanoid() }));
}

const HEADER_HEIGHT = 55;
const ROW_HEIGHT = 55;
const FOOTER_HEIGHT = 64;

interface OrdersTableProps {
  height: number;
}

const OrdersTable = ({ height }: OrdersTableProps) => {
  const orders = useStore($orders);

  const paginationConfig: TablePaginationConfig = useMemo(
    () => ({
      pageSize: Math.floor(
        (height - HEADER_HEIGHT - FOOTER_HEIGHT) / ROW_HEIGHT
      ),
    }),
    [height]
  );

  return (
    <Table
      pagination={paginationConfig}
      columns={columns}
      dataSource={orders}
    />
  );
};

export default OrdersTable;
