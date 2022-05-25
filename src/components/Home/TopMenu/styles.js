import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledBackgroundContainer = styled.div`
  background-color: ${({theme}) => theme.colors.white};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const StyledDivWrapper = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
`;

export const StyledUlWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 670px) {
    flex-direction: column;
    height: auto;
  }
`;

export const StyledLiLeftWrapper = styled.li`
  display: flex;
  align-items: center;
`;

export const StyledImgWrapper = styled.div`
  width: 150px;
`;

export const StyledLiRightWrapper = styled.li`
  width: 300px;
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.neutralBlue};
  padding-bottom: 1rem;
`;

export const StyledTitleDiv = styled.div`
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.neutralBlue};
  padding-bottom: 1rem;
`;

export const StyledLink = styled(Link)`
  color: ${({theme}) => theme.colors.neutralBlue};
`;

export const StyledWelcomeDiv = styled.div`
  text-align: center;
`;

export const StyledNavbarWrapper = styled.div``;