import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import {
  BackgroundContainer,
  LogoImg,
  DivWrapper,
  ImgWrapper,
  TextWrapper,
  SpanBold,
  ButtonWrapper,
  StyledFooter,
} from './styles';
import { StyledButton } from '../ReusableCSS';

const Hero = () => {
  const squares = (
    <ul className="circles">
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
  );

  return (
    <>
      <BackgroundContainer>
        {squares}
        <DivWrapper>
          <ImgWrapper>
            <LogoImg src={logo} alt="logo" />
          </ImgWrapper>
          <TextWrapper>
            <em>
              Connect through{' '}
              <SpanBold style={{ fontWeight: 'bold' }}>
                the world of books
              </SpanBold>
            </em>
          </TextWrapper>
          <ButtonWrapper>
            <StyledButton type="primary">
              <Link to="/login">Login</Link>
            </StyledButton>
            <StyledButton type="primary">
              <Link to="/register">Register User</Link>
            </StyledButton>
          </ButtonWrapper>
        </DivWrapper>
      </BackgroundContainer>
      <StyledFooter>
        {'Developed by '}
        <a
          target="_blank"
          href="https://www.michaelsanchez.page"
          rel="noreferrer"
        >
          &#160;Michael Sanchez
        </a>
        .&#160;Designed by
        <a
          href="https://www.codingwithkristine.com"
          target="_blank"
          rel="noreferrer"
        >
          &#160;Kristine Johnson
        </a>
        .
      </StyledFooter>
    </>
  );
};

export default Hero;
