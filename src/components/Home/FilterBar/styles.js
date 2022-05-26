import styled from 'styled-components';
import { Input } from 'antd';

export const StyledDivWrapper = styled.div`
  width: 100%;
`;

export const StyledFilterContainer = styled.div`
  z-index: 9;
  position: fixed;
  top: 9rem;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.homeBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  @media (max-width: 670px) {
    top: 6rem;
    padding-top: 4rem;
  }
`;

export const StyledInput = styled(Input)`
  width: 300px;
  margin-bottom: 1rem;
`;

export const StyledCardWrapper = styled.div`
  width: 100%;
  margin-top: 7rem;
`;
