import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button, Input, Select } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { AttributeDefinition } from '../../../types/schema';

const { Option } = Select;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled(Input)`
  flex: 3;
  margin-right: 16px;
`;

const FieldsSelect = styled(Select)`
  flex: 1;
  margin-right: 16px;
` as typeof Select;

export interface SearchMeta {
  id: string;
  fieldId?: string;
  searchValue?: string;
}

interface SearchRowProps {
  meta: SearchMeta;
  fields: AttributeDefinition[];
  hasAddButton?: boolean;
  hasRemoveButton?: boolean;
  onAddSearchRowButtonClick?: () => void;
  onRemoveButtonClick?: (id: string) => void;
  onSearchChange?: (meta: SearchMeta) => void;
}

const SearchRow = ({
  meta,
  fields = [],
  hasAddButton,
  hasRemoveButton,
  onAddSearchRowButtonClick,
  onRemoveButtonClick,
  onSearchChange,
}: SearchRowProps) => {
  const handleRemoveButtonClick = useCallback(() => {
    onRemoveButtonClick?.(meta.id);
  }, [meta, onRemoveButtonClick]);

  const handleSearchInputChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange?.({ ...meta, searchValue: ev.target.value });
    },
    [meta, onSearchChange]
  );

  const handleSearchFieldChange = useCallback(
    (fieldId: string) => {
      onSearchChange?.({ ...meta, fieldId });
    },
    [meta, onSearchChange]
  );

  return (
    <Wrapper>
      <FieldsSelect value={meta.fieldId} onChange={handleSearchFieldChange}>
        {fields.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name ?? id}
          </Option>
        ))}
      </FieldsSelect>
      <SearchInput
        value={meta.searchValue}
        onChange={handleSearchInputChange}
      />
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
