import { PlusOutlined } from '@ant-design/icons';
import { Affix, Button } from 'antd';

const Controls = () => {
  return (
    <Affix offsetTop={100}>
      <Button shape="circle" icon={<PlusOutlined />} />
    </Affix>
  );
};

export default Controls;
