import { Table } from 'antd';
import { listOrders } from '../../../types/order';
import { useAsync } from 'react-use';

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

const Orders = () => {
  const ordersState = useAsync(listOrders, []);

  console.log(ordersState);

  return <Table columns={columns} dataSource={ordersState.value} />;
};

export default Orders;
