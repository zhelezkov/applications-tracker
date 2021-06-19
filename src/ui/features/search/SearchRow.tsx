import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button, Input, Select } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { AttributeDefinition } from '../../../types/schema';

const { Search: BaseSearchInput } = Input;

const { Option } = Select;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled(BaseSearchInput)`
  flex: 3;
  margin-right: 16px;
`;

const FieldsInput = styled(Select)`
  flex: 1;
  margin-right: 16px;
`;

interface SearchRowProps {
  id: string;
  fields: AttributeDefinition[];
  hasAddButton?: boolean;
  hasRemoveButton?: boolean;
  onAddSearchRowButtonClick?: () => void;
  onRemoveButtonClick?: (id: string) => void;
}

const SearchRow = ({
  id,
  fields = [],
  hasAddButton,
  hasRemoveButton,
  onAddSearchRowButtonClick,
  onRemoveButtonClick,
}: SearchRowProps) => {
  const handleRemoveButtonClick = useCallback(() => {
    onRemoveButtonClick?.(id);
  }, [id, onRemoveButtonClick]);

  return (
    <Wrapper>
      <FieldsInput>
        {fields.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name ?? id}
          </Option>
        ))}
      </FieldsInput>
      <SearchInput />
      {hasAddButton && (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={onAddSearchRowButtonClick}
        />
      )}
      {hasRemoveButton && (
        <Button
          type="primary"
          shape="circle"
          danger
          icon={<MinusOutlined />}
          onClick={handleRemoveButtonClick}
        />
      )}
    </Wrapper>
  );
};

export default SearchRow;
