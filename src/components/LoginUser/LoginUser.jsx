/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import { Form, Button, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import Notification from '../Notification/Notification';
import {
  BackgroundFlexDiv,
  BackgroundContainer,
  FormStyled,
  InputStyled,
  InputPasswordStyled,
  LoginTextDiv,
  LoginSpanStyled,
  StyledNewBookstagram,
  StyledRegisterNow,
  StyledLogoTextDiv,
  StyledImgWrapper,
  StyledImg,
  StyledText,
  StyledSpan,
  StyledPhoneContainer,
  StyledBookPhone,
  StyledUIPhone,
  StyledLargeBubbleWrapper,
  StyledSmallBubbleWrapper,
  StyledButton,
} from '../ReusableCSS';
import Logo from '../../images/logo.svg';
import BookPhone from '../../images/home-screen-phone-books-pic.svg';
import UIPhone from '../../images/home-screen-phone-UI.svg';
import LargeBubble from '../../images/big-circle.svg';
import SmallBubble from '../../images/small-circle.svg';
import ForgotPasswordModal from './ForgotPasswordModal';

const LoginUser = () => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    authService
      .loginUser(values.email, values.password)
      .then(() => {
        navigate('/home');
        Notification(
          'success',
          'Login Successful!',
          'You are currently logged in.'
        );
      })
      .catch((error) => {
        Notification(
          'error',
          error.response.data.error,
          'Email or Password was incorrect.'
        );
      });
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    form.resetFields();
  };

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
      <BackgroundFlexDiv>
        <BackgroundContainer>
          {squares}
          <StyledLogoTextDiv>
            <StyledImgWrapper>
              <StyledImg src={Logo} alt="Logo" />
            </StyledImgWrapper>
            <StyledText>
              <em>
                Connect through the
                <StyledSpan> world of books</StyledSpan>
              </em>
            </StyledText>
          </StyledLogoTextDiv>
          <StyledPhoneContainer>
            <StyledBookPhone>
              <StyledImg src={BookPhone} alt="" />
            </StyledBookPhone>
            <StyledUIPhone>
              <StyledImg src={UIPhone} alt="" />
            </StyledUIPhone>
            <StyledLargeBubbleWrapper>
              <StyledImg src={LargeBubble} alt="largeBubble" />
            </StyledLargeBubbleWrapper>
            <StyledSmallBubbleWrapper>
              <StyledImg src={SmallBubble} alt="smallBubble" />
            </StyledSmallBubbleWrapper>
          </StyledPhoneContainer>
        </BackgroundContainer>
        <FormStyled layout="vertical" name="normal_login" onFinish={onSubmit}>
          <LoginTextDiv>
            <LoginSpanStyled>Login</LoginSpanStyled> Your Account
          </LoginTextDiv>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email.',
              },
            ]}
          >
            <InputStyled type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            placeholder="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password.',
              },
            ]}
          >
            <InputPasswordStyled placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ color: '#3E1BED' }}
              type="text"
              onClick={() => setShowModal(!showModal)}
            >
              Forgot password?
            </Button>
          </Form.Item>
          <Form.Item>
            <StyledButton larger="true" type="primary" htmlType="submit">
              Submit
            </StyledButton>
            <StyledNewBookstagram>New to Bookstagram?</StyledNewBookstagram>
            <Link to="/register">
              <StyledRegisterNow>Create An Account</StyledRegisterNow>
            </Link>
          </Form.Item>
        </FormStyled>
      </BackgroundFlexDiv>

      <Modal
        visible={showModal}
        title="Forgot Password"
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button key="1" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <ForgotPasswordModal closeParentModal={handleCancel} form={form} />
      </Modal>
    </>
  );
};

export default LoginUser;
