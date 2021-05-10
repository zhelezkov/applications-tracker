import { AutoComplete, Form, FormInstance, Select } from 'antd';
import { useStore } from 'effector-react';
import { capitalize } from 'lodash';
import type { OrderAttributes } from '../../../types/order';
import { AttributeDefinition, AttributeType } from '../../../types/schema';
import { $schema } from '../schema/model';

interface AttributeFieldProps {
  definition: AttributeDefinition;
}

const renderInputByType = ({ type, values = [] }: AttributeDefinition) => {
  if (type === AttributeType.Input) {
    return <AutoComplete options={values.map((value) => ({ value }))} />;
  }
  if (type === AttributeType.Select) {
    return <Select options={values.map((value) => ({ value }))} />;
  }
  if (type === AttributeType.MultiSelect) {
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
  form: FormInstance<OrderAttributes>;
}

const EditOrderForm = ({ form }: EditOrderFormProps) => {
  const schema = useStore($schema);

  return (
    <Form form={form} layout="vertical">
      {schema.$attributes.map((attr) => (
        <AttributeField key={attr.id} definition={attr} />
      ))}
    </Form>
  );
};
export default EditOrderForm;
