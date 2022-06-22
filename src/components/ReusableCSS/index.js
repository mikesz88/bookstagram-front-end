import styled from 'styled-components';
import { Form, Input, Button, Select } from 'antd';
import img from '../../images/backgroundWhite.png';

export const StyledButton = styled(Button)`
  width: ${({ larger }) => (larger ? `250px` : `125px`)};
  height: ${({ larger }) => (larger ? `50px` : ``)};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: 25px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    border-color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

export const BackgroundFlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;

  @media (max-width: 950px) {
    flex-direction: column;
    height: auto;
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

export const StyledFormDrawer = styled(Form)`
  max-width: 300px;
`;

export const FormItemStyled = styled(Form.Item)`
  margin-bottom: ${({ register }) => (register ? '0.1rem' : '1rem')};
  width: 300px;
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

export const SelectStyled = styled(Select)`
  font-size: 1.25rem;
  width: 300px;
  border: none;
  border-bottom: ${({ theme }) => `0.25rem solid ${theme.colors.darkBlue}`};
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  &:focus {
    box-shadow: none;
    border: none;
  }
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
  }
  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: none;
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

  &&.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
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

  @media (max-width: 950px) {
    margin: 2rem;
  }

  @media (max-width: 426px) {
    margin-top: -5rem;
  }
`;

export const LoginSpanStyled = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const SignUpTextDiv = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
  width: 300px;

  @media (max-width: 426px) {
    margin-top: -5rem;
  }
`;

export const SignUpSpanStyled = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const PasswordRulesDiv = styled.div`
  font-size: 0.65rem;
  width: 300px;
`;

export const StyledPasswordRulesDivDrawer = styled.div`
  font-size: 0.65rem;
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

  @media (max-width: 950px) {
    justify-content: space-between;
  }

  @media (max-width: 426px) {
    flex-direction: column;
    margin-top: -1rem;
    padding-bottom: 10rem;
  }
`;

export const StyledImgWrapper = styled.div`
  width: 250px;

  @media (max-width: 426px) {
    margin-bottom: -4rem;
  }
`;

export const StyledImg = styled.img`
  width: 100%;
`;

export const StyledText = styled.div`
  width: 210px;
  font-size: 1.5rem;
  z-index: 10;

  @media (max-width: 426px) {
    width: 300px;
    text-align: center;
  }
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
    top: -245px;
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
    top: -200px;
  }
`;

export const StyledLoginButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: 25px;
  color: #fff;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    border-color: ${({ theme }) => theme.colors.lightBlue};
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

export const StyledForgetModalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
