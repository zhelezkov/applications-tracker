import { Button } from 'antd';

interface ControlsProps {
  onNewOrder: () => void;
}

const Controls = ({ onNewOrder }: ControlsProps) => {
  return (
    <Button type="primary" onClick={onNewOrder}>
      Новый заказ
    </Button>
  );
};

export default Controls;
