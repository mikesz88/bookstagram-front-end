import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { FormStyled } from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { Notification } from '../Notification/Notification';

const UserLogin = ({ history }) => {
  const { authService } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const onSubmit = (values) => {
    authService.loginUser(values.email, values.password)
    .then(() => {
      navigate('/home');
    })
    .catch((error) => {
      console.log(error);
      Notification(
        'error', 
        error.response.data.error, 
        'Email or Password was incorrect.'
      )
    })
  };

  return (
    <FormStyled
      layout='vertical'
      name="normal_login"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email.',
          },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password.',
          }
        ]}
      >
        <Input.Password
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to='/register'>register now!</Link>
      </Form.Item>
    </FormStyled>
  );
}

export default UserLogin