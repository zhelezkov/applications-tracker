import { Modal } from 'antd';
import { useGate } from 'effector-react';
import React from 'react';
import { useMeasure } from 'react-use';
import styled from 'styled-components';
import { ordersGate } from '../../../models/order';
import Controls from '../../features/orders/Controls';
import EditOrderForm from '../../features/orders/EditOrderForm';
import OrdersTable from '../../features/orders/OrdersTable';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const ControlsWrapper = styled.div`
  margin-bottom: 16px;
`;

const TableWrapper = styled.div``;

const OrdersPage = () => {
  useGate(ordersGate);
  const [measureRef, { height: wrapperHeight }] = useMeasure<HTMLDivElement>();

  return (
    <Wrapper ref={measureRef}>
      <ControlsWrapper>
        <Controls />
      </ControlsWrapper>
      <TableWrapper>
        <OrdersTable height={wrapperHeight} />
      </TableWrapper>
      <Modal visible={true}>
        <EditOrderForm />
      </Modal>
    </Wrapper>
  );
};

export default OrdersPage;
