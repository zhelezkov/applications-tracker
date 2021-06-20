import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useGate } from 'effector-react';
import { fetchLogsFx, logsGate } from '../../features/logs/model';
import { useMeasure } from 'react-use';
import LogsTable from '../../features/logs/LogsTable';
import Search from '../../features/search/Search';
import type { SearchMeta } from '../../features/search/SearchRow';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
`;

const SearchBlockWrapper = styled.div`
  padding: 0 16px 0 16px;
`;

const LogsPage = () => {
  useGate(logsGate);
  const [measureRef, { height: wrapperHeight }] = useMeasure<HTMLDivElement>();

  const handleSearch = useCallback((params: SearchMeta[]) => {
    const search = params
      .filter((it) => it.searchValue && it.fieldId)
      .map((it) => ({
        field: it.fieldId!,
        value: it.searchValue!,
      }));
    fetchLogsFx(search);
  }, []);

  return (
    <Wrapper ref={measureRef}>
      <SearchBlockWrapper>
        <Search onPerformSearch={handleSearch} />
      </SearchBlockWrapper>
      <div>
        <LogsTable height={wrapperHeight} />
      </div>
    </Wrapper>
  );
};

export default LogsPage;
