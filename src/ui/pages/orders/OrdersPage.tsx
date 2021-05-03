import { Form, Modal } from 'antd';
import { useGate } from 'effector-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useMeasure } from 'react-use';
import styled from 'styled-components';
import {
  newOrderFx,
  Order,
  OrderAttributes,
  ordersGate,
  updateOrderFx,
} from '../../../models/order';
import Controls from '../../features/orders/Controls';
import EditOrderForm from '../../features/orders/EditOrderForm';
import OrdersTable from '../../features/orders/OrdersTable';

const ORDER_ID_INTERNAL_FIELD_NAME = '__internal_orderId';

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

  const [form] = Form.useForm<OrderAttributes>();

  const [activeOrderId, setActiveOrderId] = useState<number | null>(null);
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);

  const handleNewOrderClick = useCallback(() => {
    setOrderFormVisible(true);
  }, []);

  const handleOrderSave = useCallback(() => {
    if (activeOrderId) {
      const order: Order = {
        id: activeOrderId,
        attributes: form.getFieldsValue(),
      };
      updateOrderFx(order).then(() => {
        setOrderFormVisible(false);
        setActiveOrderId(null);
        form.resetFields();
      });
    } else {
      newOrderFx(form.getFieldsValue()).then(() => {
        setOrderFormVisible(false);
        form.resetFields();
      });
    }
  }, [activeOrderId, form]);

  const handleCancel = useCallback(() => {
    setOrderFormVisible(false);
    form.resetFields();
  }, [form]);

  const handleOrderRowClick = useCallback(
    (order: Order) => {
      const attributesAsFields = Object.entries(order.attributes || {}).map(
        ([id, value]) => ({
          name: id,
          value,
        })
      );
      form.setFields(attributesAsFields);
      setOrderFormVisible(true);
      setActiveOrderId(order.id);
    },
    [form]
  );

  return (
    <Wrapper ref={measureRef}>
      <ControlsWrapper>
        <Controls onNewOrder={handleNewOrderClick} />
      </ControlsWrapper>
      <TableWrapper>
        <OrdersTable height={wrapperHeight} onRowClick={handleOrderRowClick} />
      </TableWrapper>
      <Modal
        visible={isOrderFormVisible}
        onOk={handleOrderSave}
        onCancel={handleCancel}
      >
        <EditOrderForm form={form} />
      </Modal>
    </Wrapper>
  );
};

export default OrdersPage;
