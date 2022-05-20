import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
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

export const FormStyled = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputStyled = styled(Input)`
  font-size: 1.25rem;
  width: 300px;
  border: none;
  border-bottom: ${({ theme }) => `0.25rem solid ${theme.colors.darkBlue}`};
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  &:focus {
    box-shadow: none;
  }
  &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus {
    border-bottom: 0.25rem solid #ff4d4f;
    box-shadow: none;
  }
`;

export const InputPasswordStyled = styled(Input.Password)`
  font-size: 1.25rem;
  width: 300px;
  border: none;
  border-bottom: ${({ theme }) => `0.25rem solid ${theme.colors.darkBlue}`};
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  &:focus {
    box-shadow: none;
  }
  &&.ant-input-affix-wrapper > input.ant-input { 
    font-size: 1.25rem;
  }

  &&.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper, .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
    box-shadow: none;
    background: #fff;
    border-bottom-color: #ff4d4f; 
  }

  &&.ant-input-affix-wrapper-focused {
    box-shadow: none;
  }
`;

export const LoginTextDiv = styled.div`
  margin-bottom: 4rem;
  font-size: 1.5rem;
  text-align: center;
`;

export const LoginSpanStyled = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBlue};
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