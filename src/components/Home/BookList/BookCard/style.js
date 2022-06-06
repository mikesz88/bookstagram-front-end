import { Card } from 'antd';
import styled from 'styled-components';

export const StyledBookCardWrapper = styled.div`
  margin: 0 auto 1.5rem auto;
  max-width: 500px;
`;

export const StyledModalBookCardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledCard = styled(Card)`
  max-width: 500px;
  cursor: default;
`;

export const StyledModalCard = styled(Card)`
  width: 300px;
`;
