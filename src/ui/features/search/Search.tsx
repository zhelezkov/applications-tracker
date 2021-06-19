import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SearchRow from './SearchRow';
import { nanoid } from 'nanoid';
import { useStore } from 'effector-react';
import { $attributes } from '../schema/model';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowWrapper = styled.div`
  margin-bottom: 16px;
`;

interface SearchField {
  id: string;
}

function newSearchField(): SearchField {
  return { id: nanoid() };
}

interface SearchProps {}

const Search = ({}: SearchProps) => {
  const fields = useStore($attributes);

  const [searchFields, setSearchFields] = useState<SearchField[]>([
    newSearchField(),
  ]);

  const handleNewSearchClick = useCallback(() => {
    setSearchFields((prev) => [...prev, newSearchField()]);
  }, []);

  const handleSearchRemove = useCallback((id: string) => {
    setSearchFields((prev) => prev.filter((it) => it.id !== id));
  }, []);

  return (
    <Wrapper>
      {searchFields.map(({ id }, index) => (
        <RowWrapper key={id}>
          <SearchRow
            id={id}
            fields={fields}
            hasAddButton={index === searchFields.length - 1}
            hasRemoveButton={index !== searchFields.length - 1}
            onAddSearchRowButtonClick={handleNewSearchClick}
            onRemoveButtonClick={handleSearchRemove}
          />
        </RowWrapper>
      ))}
    </Wrapper>
  );
};

export default Search;
