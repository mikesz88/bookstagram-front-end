import React, { useContext } from 'react';
import { Input, Button, Form, Select } from 'antd';
import { FormStyled, PasswordRulesDiv } from './styles';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../Notification/Notification';
import { forgotPasswordQuestions } from '../../constants/forgotPasswordQuestions';

const RegisterUser = () => {
  const { authService } = useContext(UserContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = values => {
    console.log('Received values of form: ', values);
    const { 
      firstName, 
      lastName, 
      email,
      password, 
      role, 
      forgotPasswordQuestion, 
      forgotPasswordAnswer 
    } = values;
    authService.registerUser( 
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
    })
    .catch(() => {
      Notification(
        'error', 
        'Connection Error', 
        'There was something wrong with the connection.'
      )
      form.resetFields();
    })
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  const onRoleChange = value => {
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
        return;

      default:
        return;
    }
  }
  
  const onForgotQuestionChange = value => {
    switch (value) {
      case "What is your mother's maiden name?":
        form.setFieldsValue({
          note: "What is your mother's maiden name?",
        });
        return;

      case "What is the name of your first pet?":
        form.setFieldsValue({
          note: "What is the name of your first pet?",
        });
        return;

      case "What was your first car?":
        form.setFieldsValue({
          note: "What was your first car?",
        });
        return;

      case "What elementary school did you attend?":
        form.setFieldsValue({
          note: "What elementary school did you attend?",
        });
        return;

      case "What is the name of the town where you were born?":
        form.setFieldsValue({
          note: "What is the name of the town where you were born?",
        });
        return;

      default:
        return;
    }
  }

  return (
    <FormStyled
      layout='vertical'
      name='register_user'
      onFinish={onSubmit}
      form={form}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please input your first name.'
          }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please input your last name.'
          }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Password">
        <PasswordRulesDiv>
          Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +
        </PasswordRulesDiv>
        <Form.Item 
          name="password" 
          noStyle
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
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
        label="Confirm Password"
        name="confirm"
        dependencies={['password']}
        hasFeedback
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
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
      >
        <Select
          placeholder="Select a role"
          onChange={onRoleChange}
          allowClear
        >
          <Select.Option value="admin">admin</Select.Option>
          <Select.Option value="user">user</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Pick a 'Forgot a Password' Question"
        name="forgotPasswordQuestion"
        rules={[
          {
            required: true,
            message: 'Please input your last name.'
          }
        ]}
      >
        <Select
          placeholder="Pick a question"
          onChange={onForgotQuestionChange}
          allowClear
        >
          {forgotPasswordQuestions.map((question, index) => (
            <Select.Option key={Date.now() + index} value={question}>{question}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Forgot a Password Answer"
        name="forgotPasswordAnswer"
        rules={[
          {
            required: true,
            message: 'Please input your last name.'
          }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </FormStyled>
  )
}

export default RegisterUser