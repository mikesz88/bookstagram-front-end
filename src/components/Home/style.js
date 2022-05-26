import styled from 'styled-components';

export const StyledBackgroundContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.homeBackground};
`;

export const StyledFilterContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
`;
