import { AutoComplete, Form, Select } from 'antd';
import { useStore } from 'effector-react';
import { capitalize } from 'lodash';
import type { Order } from '../../../models/order';
import type { AttributeDefinition } from '../../../models/schema';
import { $schema, AttributeType } from '../../../models/schema';

interface AttributeFieldProps {
  definition: AttributeDefinition;
}

const renderInputByType = ({ type, values = [] }: AttributeDefinition) => {
  if (type === AttributeType.input) {
    return <AutoComplete options={values.map((value) => ({ value }))} />;
  }
  if (type === AttributeType.select) {
    return <Select options={values.map((value) => ({ value }))} />;
  }
  if (type === AttributeType.multiSelect) {
    return (
      <Select mode="multiple" options={values.map((value) => ({ value }))} />
    );
  }
  return null;
};

const AttributeField = ({ definition }: AttributeFieldProps) => {
  const { id, name } = definition;
  const label = capitalize(name ?? id);
  return (
    <Form.Item label={label} name={id}>
      {renderInputByType(definition)}
    </Form.Item>
  );
};

interface EditOrderFormProps {
  defaultValue?: Order;
}

const EditOrderForm = ({}: EditOrderFormProps) => {
  const schema = useStore($schema);

  return (
    <Form layout="vertical">
      {schema.$attributes.map((attr) => (
        <AttributeField key={attr.id} definition={attr} />
      ))}
    </Form>
  );
};
export default EditOrderForm;
