/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import { Form, Select, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import Notification from '../Notification/Notification';
import forgotPasswordQuestions from '../../constants/forgotPasswordQuestions';
import {
  BackgroundFlexDiv,
  BackgroundContainer,
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
  FormStyled,
  PasswordRulesDiv,
  SignUpTextDiv,
  SignUpSpanStyled,
  FormItemStyled,
  InputStyled,
  InputPasswordStyled,
  SelectStyled,
  StyledButton,
} from '../ReusableCSS';
import Logo from '../../images/logo.svg';
import BookPhone from '../../images/home-screen-phone-books-pic.svg';
import UIPhone from '../../images/home-screen-phone-UI.svg';
import LargeBubble from '../../images/big-circle.svg';
import SmallBubble from '../../images/small-circle.svg';

const RegisterUser = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const { authService } = useContext(UserContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    setIsSpinning(true);
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
    } = values;
    authService
      .registerUser(
        firstName,
        lastName,
        email.toLowerCase(),
        role,
        forgotPasswordQuestion,
        forgotPasswordAnswer,
        password
      )
      .then(() => {
        navigate('/home');
        Notification(
          'success',
          'Sign Up Successful',
          'You are now currently logged in.'
        );
      })
      .catch(() => {
        Notification(
          'error',
          'Connection Error',
          'There was something wrong with the connection.'
        );
        form.resetFields();
      });
    setIsSpinning(false);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  const onRoleChange = (value) => {
    switch (value) {
      case 'admin':
        form.setFieldsValue({
          note: 'admin',
        });
        return;

      case 'user':
        form.setFieldsValue({
          note: 'user',
        });
        break;

      default:
    }
  };

  const onForgotQuestionChange = (value) => {
    switch (value) {
      case "What is your mother's maiden name?":
        form.setFieldsValue({
          note: "What is your mother's maiden name?",
        });
        return;

      case 'What is the name of your first pet?':
        form.setFieldsValue({
          note: 'What is the name of your first pet?',
        });
        return;

      case 'What was your first car?':
        form.setFieldsValue({
          note: 'What was your first car?',
        });
        return;

      case 'What elementary school did you attend?':
        form.setFieldsValue({
          note: 'What elementary school did you attend?',
        });
        return;

      case 'What is the name of the town where you were born?':
        form.setFieldsValue({
          note: 'What is the name of the town where you were born?',
        });
        break;

      default:
    }
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
      <FormStyled
        layout="horizontal"
        name="register_user"
        onFinish={onSubmit}
        form={form}
      >
        <Spin spinning={isSpinning}>
          <SignUpTextDiv>
            <SignUpSpanStyled>Sign Up</SignUpSpanStyled> FOR BOOKSTAGRAM
          </SignUpTextDiv>
          <FormItemStyled
            name="firstName"
            register="true"
            rules={[
              {
                required: true,
                message: 'Please input your first name.',
              },
            ]}
          >
            <InputStyled type="text" placeholder="First Name" />
          </FormItemStyled>
          <FormItemStyled
            name="lastName"
            register="true"
            rules={[
              {
                required: true,
                message: 'Please input your last name.',
              },
            ]}
          >
            <InputStyled type="text" placeholder="Last Name" />
          </FormItemStyled>
          <FormItemStyled
            name="email"
            register="true"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <InputStyled type="email" placeholder="Email" />
          </FormItemStyled>
          <Form.Item noStyle>
            <PasswordRulesDiv>
              Password must be 8-20 characters, including: at least one capital
              letter, at least one small letter, one number and one special
              character - ! @ # $ % ^ & * ( ) _ +
            </PasswordRulesDiv>
            <FormItemStyled
              name="password"
              register="true"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  min: 8,
                  message: 'Must be a minimum of 8 characters',
                },
                {
                  pattern: passwordRegex,
                  message:
                    'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
                },
              ]}
            >
              <InputPasswordStyled type="password" placeholder="Password" />
            </FormItemStyled>
          </Form.Item>
          <FormItemStyled
            name="confirm"
            dependencies={['password']}
            hasFeedback
            register="true"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <InputPasswordStyled placeholder="Confirm Password" />
          </FormItemStyled>
          <FormItemStyled name="role" register="true">
            <SelectStyled
              placeholder="Select a role"
              onChange={onRoleChange}
              allowClear
            >
              <Select.Option value="admin">admin</Select.Option>
              <Select.Option value="user">user</Select.Option>
            </SelectStyled>
          </FormItemStyled>
          <FormItemStyled
            name="forgotPasswordQuestion"
            register="true"
            rules={[
              {
                required: true,
                message: 'Please select your question.',
              },
            ]}
          >
            <SelectStyled
              placeholder="Forgot Password Question"
              onChange={onForgotQuestionChange}
              allowClear
            >
              {forgotPasswordQuestions.map((question) => (
                <Select.Option key={question} value={question}>
                  {question}
                </Select.Option>
              ))}
            </SelectStyled>
          </FormItemStyled>
          <FormItemStyled
            name="forgotPasswordAnswer"
            register="true"
            rules={[
              {
                required: true,
                message: 'Please write your answer.',
              },
            ]}
          >
            <InputStyled type="text" placeholder="Forgot Password Answer" />
          </FormItemStyled>
          <FormItemStyled register="true" style={{ textAlign: 'center' }}>
            <div>By signing up you agree to our terms and policies.</div>
            <StyledButton
              larger="true"
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </StyledButton>
          </FormItemStyled>
        </Spin>
      </FormStyled>
    </BackgroundFlexDiv>
  );
};

export default RegisterUser;
