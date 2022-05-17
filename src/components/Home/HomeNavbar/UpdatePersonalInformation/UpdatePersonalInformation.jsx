import React, { useState, useContext } from 'react';
import { Input, Button, Form, Select } from 'antd';
import { FormStyled } from './styles';
import { UserContext } from '../../../../App';
import { Notification } from '../../../Notification/Notification';

const UpdatePersonalInformation = ({ close }) => {
  const { authService } = useContext(UserContext);
  const [form] = Form.useForm();
  
  const onSubmit = values => {
    let body = {};
    for (const key of Object.keys(values)) {
      if (values[key]) {
        key === 'email' 
        ? body[key] = values[key].toLowerCase()
        : body[key] = values[key];
      }
    }
    if (!Object.keys(body).length) {
      return Notification(
        'error', 
        'Empty!', 
        'You must change at least one.'
      )
    }
    console.log('Received values of form: ', body);
    authService.updateUserDetails(body)
    .then(() => {
      console.log('Update Successful');
      close(false);
      Notification(
        'success', 
        'Profile Updated', 
        'Your profile has been successfully updated.'
      )
      form.resetFields();
    })
    .catch((error) => {
      console.log(error);
      Notification(
        'error', 
        'Connection Error', 
        'There was something wrong with the connection.'
      )
      form.resetFields();
    })
  }

  const closeModal = () => {
    form.resetFields();
    close();
  }

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

  const { firstName, lastName, email, role } = authService;

  return (
    <>
      <div>
        <div>
          Current First Name: 
          <div>{firstName}</div>
        </div>
        <div>
          Current Last Name: 
          <div>{lastName}</div>
        </div>        
        <div>
          Current Email: 
          <div>{email}</div>
        </div>        
        <div>
          Current Role: 
          <div>
            {`${role[0].toUpperCase()}${role.slice(1).toLowerCase()}`}
            </div>
        </div>      
      </div>
      <FormStyled
        layout='vertical'
        name='register_user'
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="First Name"
          name="firstName"
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
        >
          <Input type="email" />
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
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button 
              type="primary" 
              htmlType="submit"
              >
              Submit
            </Button>
          </div>
        </Form.Item>
      </FormStyled>
    </>
  )
}

export default UpdatePersonalInformation