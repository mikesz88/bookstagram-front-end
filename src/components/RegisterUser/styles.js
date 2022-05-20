import styled from 'styled-components';
import { Form, Button } from 'antd';
import img from '../../images/backgroundWhite.png';

export const BackgroundFlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

export const BackgroundContainer = styled.div`
  background-image: url(${img});
  background-size: cover;
  flex: 2;
`;

export const StyledNewBookstagram = styled.div`
  margin: 1rem auto;
  text-align: center;
  font-size: 1.25rem;
`;

export const StyledRegisterNow = styled.div`
  margin: 1rem auto;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBlue};

  &:hover {
    color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

export const StyledLogoTextDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 949px) {
    justify-content: space-between;
  }

  @media (max-width: 426px) {
    margin-top: -1rem;
  }
`;

export const StyledImgWrapper = styled.div`
  width: 250px;
`;

export const StyledImg = styled.img`
  width: 100%;
`;

export const StyledText = styled.div`
  width: 210px;
  font-size: 1.5rem;
  z-index: 10;
`;

export const StyledSpan = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const StyledPhoneContainer = styled.div`
  position: relative;
  max-width: 900px;

  @media (max-width: 601px) {
    display: none;
  }
`;

export const StyledBookPhone = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 5%;
  right: 0;
  top: -125px;
  z-index: 1;

  @media (max-width: 1100px) {
    top: -70px;
  }

  @media (max-width: 950px) {
    width: 200px;
    top: -225px;
  }
`;

export const StyledUIPhone = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 25%;
  right: 0;
  top: -60px;
  z-index: 2;

  @media (max-width: 1100px) {
    top: -25px;
  }

  @media (max-width: 950px) {
    width: 200px;
    left: 15%;
    top: -180px;
  }
`;

export const StyledLoginButton = styled(Button)`
  background-color: ${({theme}) => theme.colors.darkBlue};
  border-color: ${({theme}) => theme.colors.darkBlue};
  border-radius: 25px;
  color: #fff;

  &:hover {
    background-color: ${({theme}) => theme.colors.lightBlue};
    border-color: ${({theme}) => theme.colors.lightBlue};
    color: #fff;
    }
`;

export const StyledFormWrapper = styled.div`
  margin-top: 1.5rem;
`;

export const StyledFormQuestion = styled.div`
  font-size: 1.25rem;
`;

export const StyledLargeBubbleWrapper = styled.div`
  position: absolute;
  width: 400px;
  right: 0;

  @media (max-width: 950px) {
    width: 200px;
    left: 50%;
    right: 0;
    top: -180px;
  }
`;

export const StyledSmallBubbleWrapper = styled.div`
  position: absolute;
  width: 400px;
  right: -10rem;
  top: -8rem;

  @media (max-width: 950px) {
    width: 200px;
    left: 60%;
    right: 0%;
    top: -250px;
  }
`;

export const FormStyled = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormItemStyled = styled(Form.Item)`
  margin-bottom: 1rem;
`;

export const SignUpTextDiv = styled.div`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
  width: 300px;
`;

export const SignUpSpanStyled = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const PasswordRulesDiv = styled.div`
  font-size: 0.65rem;
  width: 300px;
`;