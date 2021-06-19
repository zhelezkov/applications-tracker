import { Button, Form, Modal, Popconfirm } from 'antd';
import { useGate } from 'effector-react';
import React, { useCallback, useState } from 'react';
import { useMeasure } from 'react-use';
import styled from 'styled-components';
import type { Order, OrderAttributes } from '../../../types/order';
import Controls from '../../features/orders/Controls';
import EditOrderForm from '../../features/orders/EditOrderForm';
import {
  newOrderFx,
  ordersGate,
  updateOrderFx,
} from '../../features/orders/model';
import OrdersTable from '../../features/orders/OrdersTable';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const ControlsWrapper = styled.div`
  margin-bottom: 16px;
`;

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
      <div>
        <OrdersTable height={wrapperHeight} onRowClick={handleOrderRowClick} />
      </div>
      <Modal
        visible={isOrderFormVisible}
        onCancel={handleCancel}
        footer={[
          <Popconfirm title="внести изменения?" onConfirm={handleOrderSave}>
            <Button type="primary">Сохранить</Button>
          </Popconfirm>,
        ]}
      >
        <EditOrderForm form={form} />
      </Modal>
    </Wrapper>
  );
};

export default OrdersPage;
