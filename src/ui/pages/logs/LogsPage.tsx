import styled from 'styled-components';
import { useGate } from 'effector-react';
import { logsGate } from '../../features/logs/model';
import { useMeasure } from 'react-use';
import React from 'react';
import LogsTable from '../../features/logs/LogsTable';
import Search from '../../features/search/Search';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const SearchBlockWrapper = styled.div`
  padding: 0 16px 16px 16px;
`;

const LogsPage = () => {
  useGate(logsGate);
  const [measureRef, { height: wrapperHeight }] = useMeasure<HTMLDivElement>();

  return (
    <Wrapper ref={measureRef}>
      <SearchBlockWrapper>
        <Search />
      </SearchBlockWrapper>
      <div>
        <LogsTable height={wrapperHeight} />
      </div>
    </Wrapper>
  );
};

export default LogsPage;
