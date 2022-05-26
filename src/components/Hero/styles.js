import styled from 'styled-components';
import img from '../../images/background.png';

export const BackgroundContainer = styled.div`
  background-image: url(${img});
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LogoImg = styled.img`
  width: 100%;
`;

export const ImgWrapper = styled.div`
  width: 300px;
  height: auto;
`;

export const TextWrapper = styled.div`
  margin-top: -3rem;
  margin-bottom: 2rem;
  font-size: large;
`;

export const SpanBold = styled.span`
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const ButtonWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
