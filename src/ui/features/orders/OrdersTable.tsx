import { Table, TablePaginationConfig } from 'antd';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { useMeasure } from 'react-use';
import styled from 'styled-components';

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
  // const ordersState = useAsync(listOrders, []);

  const dataSource = genOrders(25);
  console.log(dataSource);

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
      dataSource={dataSource}
    />
  );
};

export default OrdersTable;
