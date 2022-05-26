/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import LogoNoText from '../../../images/logo-no-text.svg';
import Navbar from './Navbar/Navbar';
import {
  StyledBackgroundContainer,
  StyledDivWrapper,
  StyledImgWrapper,
  StyledLiLeftWrapper,
  StyledLink,
  StyledLiRightWrapper,
  StyledNavbarWrapper,
  StyledTitleDiv,
  StyledUlWrapper,
  StyledWelcomeDiv,
} from './styles';
import { StyledImg } from '../../ReusableCSS';

const TopMenu = () => {
  const { authService } = useContext(UserContext);

  return (
    <StyledBackgroundContainer>
      <StyledDivWrapper>
        <StyledUlWrapper>
          <StyledLiLeftWrapper>
            <StyledImgWrapper>
              <StyledImg src={LogoNoText} alt="logo" />
            </StyledImgWrapper>
            <StyledTitleDiv>
              <StyledLink style={{ color: '#2c3dbd' }} to="/home">
                BOOKSTAGRAM
              </StyledLink>
            </StyledTitleDiv>
          </StyledLiLeftWrapper>
          <StyledLiRightWrapper>
            <StyledWelcomeDiv>
              Welcome {`${authService.firstName} ${authService.lastName}`}
            </StyledWelcomeDiv>
            <StyledNavbarWrapper>
              <Navbar />
            </StyledNavbarWrapper>
          </StyledLiRightWrapper>
        </StyledUlWrapper>
      </StyledDivWrapper>
    </StyledBackgroundContainer>
  );
};

export default TopMenu;
