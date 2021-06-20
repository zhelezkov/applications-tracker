import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AutoComplete, Button, Select } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { AttributeDefinition } from '../../../types/schema';

const { Option } = Select;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled(AutoComplete)`
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
  selectedFields?: string[];
  hasAddButton?: boolean;
  hasRemoveButton?: boolean;
  onAddSearchRowButtonClick?: () => void;
  onRemoveButtonClick?: (id: string) => void;
  onSearchChange?: (meta: SearchMeta) => void;
}

const SearchRow = ({
  meta,
  fields = [],
  selectedFields = [],
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
    (value: string) => {
      onSearchChange?.({ ...meta, searchValue: value });
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
      <FieldsSelect
        placeholder="Выберите поле"
        value={meta.fieldId}
        onChange={handleSearchFieldChange}
      >
        {fields
          .filter(
            ({ id }) => id === meta.fieldId || !selectedFields.includes(id)
          )
          .map(({ id, name }) => {
            return (
              <Option key={id} value={id}>
                {name}
              </Option>
            );
          })}
      </FieldsSelect>
      <SearchInput
        placeholder="Поиск"
        value={meta.searchValue}
        options={
          fields
            .find((it) => it.id === meta.fieldId)
            ?.values?.map((it) => ({ value: it })) ?? []
        }
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
