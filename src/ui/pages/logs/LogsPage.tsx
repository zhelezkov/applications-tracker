import styled from 'styled-components';
import { useGate } from 'effector-react';
import { logsGate } from '../../features/logs/model';
import { useMeasure } from 'react-use';
import React from 'react';
import LogsTable from '../../features/logs/LogsTable';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const LogsPage = () => {
  useGate(logsGate);
  const [measureRef, { height: wrapperHeight }] = useMeasure<HTMLDivElement>();

  return (
    <Wrapper ref={measureRef}>
      <div>
        <LogsTable height={wrapperHeight} />
      </div>
    </Wrapper>
  );
};

export default LogsPage;
