import React, { useState, useContext } from 'react'
import { UserContext } from '../../App';
import { Form, Modal, Button, Input, Result } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Notification } from '../Notification/Notification';
import {
  FormStyled,
  InputStyled,
  StyledLoginButton,
  StyledFormWrapper,
  StyledFormQuestion,
  StyledForgetModalDiv
} from '../ReusableCSS';

const { confirm } = Modal;

const ForgotPasswordModal = ({ form, closeParentModal }) => {
  const { authService } = useContext(UserContext);
  const [resetModal, setResetModal] = useState(false);
  const [email, setEmail] = useState('');
  const [forgotQuestion, setForgotQuestion] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [successResult, setSuccessResult] = useState(false);

  const handleQuestion = () => {
    console.log('handle question');
    authService.forgotQuestion(email)
      .then(res => {
        setForgotQuestion(res.data.data)
        Notification('info', 'Email Found', 'Please type the correct answer.')
      })
      .catch(err => {
        Notification('error', 'No Email Found', err.response.data.error)
      })
  }

  const handleQuestionChange = ({ target: { value }}) => {
    console.log('handle change of question');
    setEmail(value);
  }

  const onFinish = (values) => {
    const { forgotPasswordAnswer } = values;
    console.log(values, 'values');
    authService.verifyForgotPassword(email, forgotPasswordAnswer)
      .then(res => {
        setResetToken(res.data.data);
        Notification('success', 'Success', 'Please write a new password.');
        setResetModal(!resetModal);
      })
      .catch(err => Notification('error', err.response.data.error, 'The answer was incorrect.'))
  }

  const handleCancel = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to reset?',
      onOk() {
        console.log('OK');
        setResetModal(!resetModal);
        form.resetFields();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const resetSubmit = (values) => {
    console.log(values, 'values');
    const { newPassword } = values;
    authService.resetPassword(resetToken, newPassword)
      .then(() => {
        Notification('success', 'Password Reset', 'Your password has been changed. Please login with your new password.')
        setSuccessResult(!successResult);
        setResetModal(!resetModal);
      })
      .catch(err => {
        Notification('error', err.response.data.error, 'There was an error. Please try again.')
        console.log(err);
      })
    
  }

  const closeModals = () => {
    setResetModal(false);
    setSuccessResult(false);
    closeParentModal(false);
  }

  const forgotPasswordForm = (
    <StyledFormWrapper>
      <FormStyled
        layout='vertical'
        name="forgot_login"
        onFinish={onFinish}
        form={form}
      >
        <StyledFormQuestion>{forgotQuestion}</StyledFormQuestion>
        <Form.Item
          name="forgotPasswordAnswer"
          rules={[
            {
              required: true,
              message: 'Please write your answer.',
            },
          ]}
        >
          {forgotQuestion 
            ? <InputStyled type="text" placeholder="Answer" /> 
            : ''
          }
        </Form.Item>
        <Form.Item style={{ marginTop: '1rem' }}>
        {forgotQuestion 
          ? <StyledLoginButton 
              size='large' 
              htmlType="submit" 
              >
              Submit
            </StyledLoginButton>
          : ''
        }
        </Form.Item>
      </FormStyled>
    </StyledFormWrapper>
  )

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  return (
    <>
      <StyledForgetModalDiv>
        <InputStyled type="email" onChange={handleQuestionChange} placeholder="Write your email"/>
        <StyledLoginButton size='large' onClick={handleQuestion} >Find Question</StyledLoginButton>
      </StyledForgetModalDiv>
      {handleQuestion ? forgotPasswordForm : ''}

      <Modal
        visible={resetModal}
        title="Reset Password"
        destroyOnClose
        onCancel={handleCancel}
        footer={[
          <Button key="1" onClick={handleCancel}>Cancel</Button>,
        ]}
      >
        <FormStyled
          layout='vertical'
          name='new_password'
          onFinish={resetSubmit}
        >
          <Form.Item label="New Password">
            <div>
              Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +
            </div>
            <Form.Item 
              name="newPassword" 
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input your Password.',
                },
                {
                  min: 8,
                  message: 'Must be a minimum of 8 characters'
                },
                {
                  pattern: passwordRegex,
                  message: 'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +'
                }
              ]}>
              <Input.Password
                type="password"
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Confirm  New Password"
            name="confirm"
            dependencies={['newPassword']}
            hasFeedback
            style={{width: '100%'}}
            rules={[
              {
                required: true,
                message: 'Please confirm your  new password.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              >
              Submit
            </Button>
          </Form.Item>
        </FormStyled>
      </Modal>

      <Modal
        visible={successResult}
        onCancel={closeModals}
        footer={[
          <Button key='close' type='primary' onClick={closeModals} >Close</Button>
        ]}
      >
        <Result 
          status='success'
          title='Successfully Changed Password'
          subTitle='You have successfully change your password. Please click close out and sign in again with your new password. Close the button below to get back to the login screen.'
        />
      </Modal>
    </>
  )
}

export default ForgotPasswordModal