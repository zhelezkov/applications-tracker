import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import SearchRow, { SearchMeta } from './SearchRow';
import { useStore } from 'effector-react';
import { $attributes } from '../schema/model';
import { newSearchMeta } from './utils';
import { useDebounce } from 'react-use';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowWrapper = styled.div`
  margin-bottom: 16px;
`;

interface SearchProps {
  onPerformSearch?: (searchParams: SearchMeta[]) => void;
}

const Search = ({ onPerformSearch }: SearchProps) => {
  const fields = useStore($attributes);

  const [searchFields, setSearchFields] = useState<SearchMeta[]>([
    newSearchMeta(),
  ]);

  const handleNewSearchClick = useCallback(() => {
    setSearchFields((prev) => [...prev, newSearchMeta()]);
  }, []);

  const handleSearchRemove = useCallback((id: string) => {
    setSearchFields((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const handleSearchChange = useCallback(
    (meta: SearchMeta) =>
      setSearchFields((prev) =>
        prev.map((it) => {
          if (it.id === meta.id) {
            return meta;
          }
          return it;
        })
      ),
    []
  );

  const selectedFields = useMemo(
    () =>
      searchFields.filter((meta) => meta.fieldId).map((meta) => meta.fieldId!),
    [searchFields]
  );

  useDebounce(
    () => {
      onPerformSearch?.(searchFields);
    },
    1000,
    [searchFields]
  );

  return (
    <Wrapper>
      {searchFields.map((meta, index) => (
        <RowWrapper key={meta.id}>
          <SearchRow
            meta={meta}
            fields={fields}
            selectedFields={selectedFields}
            hasAddButton={index === searchFields.length - 1}
            hasRemoveButton={index !== searchFields.length - 1}
            onAddSearchRowButtonClick={handleNewSearchClick}
            onRemoveButtonClick={handleSearchRemove}
            onSearchChange={handleSearchChange}
          />
        </RowWrapper>
      ))}
    </Wrapper>
  );
};

export default Search;
