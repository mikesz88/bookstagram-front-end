/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { Input, Button, Form, Select } from 'antd';
import {
  StyledButtonWrapper,
  StyledFormDrawer as FormStyled,
} from '../../../../ReusableCSS';
import { UserContext } from '../../../../../App';
import Notification from '../../../../Notification/Notification';

const UpdatePersonalInformation = ({ close }) => {
  const { authService, updateService } = useContext(UserContext);
  const [form] = Form.useForm();

  // eslint-disable-next-line consistent-return
  const onSubmit = (values) => {
    const body = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(values)) {
      if (values[key]) {
        // eslint-disable-next-line no-unused-expressions
        key === 'email'
          ? (body[key] = values[key].toLowerCase())
          : (body[key] = values[key]);
      }
    }
    if (!Object.keys(body).length) {
      return Notification('error', 'Empty!', 'You must change at least one.');
    }
    authService
      .updateUserDetails(body)
      .then(() => {
        close(false);
        Notification(
          'success',
          'Profile Updated',
          'Your profile has been successfully updated.'
        );
        form.resetFields();
        updateService();
      })
      .catch(() => {
        Notification(
          'error',
          'Connection Error',
          'There was something wrong with the connection.'
        );
        form.resetFields();
      });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const onRoleChange = (value) => {
    switch (value) {
      case 'ADMIN':
        form.setFieldsValue({
          note: 'ADMIN',
        });
        return;

      case 'USER':
        form.setFieldsValue({
          note: 'USER',
        });
        break;

      default:
    }
  };

  const { firstName, lastName, email, role } = authService;

  return (
    <>
      <div>
        <div>
          <strong>Current First Name: </strong>
          <div>{firstName}</div>
        </div>
        <div>
          <strong>Current Last Name: </strong>
          <div>{lastName}</div>
        </div>
        <div>
          <strong>Current Email: </strong>
          <div>{email}</div>
        </div>
        <div>
          <strong>Current Role: </strong>
          <div>{`${role[0].toUpperCase()}${role.slice(1).toLowerCase()}`}</div>
        </div>
      </div>
      <FormStyled
        layout="vertical"
        name="register_user"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item label="First Name" name="firstName">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select
            placeholder="Select a role"
            onChange={onRoleChange}
            allowClear
          >
            <Select.Option value="ADMIN">admin</Select.Option>
            <Select.Option value="USER">user</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <StyledButtonWrapper>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </StyledButtonWrapper>
        </Form.Item>
      </FormStyled>
    </>
  );
};

export default UpdatePersonalInformation;
