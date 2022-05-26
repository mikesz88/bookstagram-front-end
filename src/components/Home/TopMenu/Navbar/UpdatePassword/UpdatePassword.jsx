/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import { Input, Button, Form } from 'antd';
import {
  StyledButtonWrapper,
  StyledFormDrawer as FormStyled,
  StyledPasswordRulesDivDrawer as PasswordRulesDiv,
} from '../../../../ReusableCSS';
import { UserContext } from '../../../../../App';
import Notification from '../../../../Notification/Notification';

const UpdatePassword = ({ close }) => {
  const { authService } = useContext(UserContext);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  // eslint-disable-next-line consistent-return
  const onSubmit = (values) => {
    setConfirmLoading(false);
    const { currentPassword, newPassword } = values;
    if (currentPassword === newPassword) {
      return Notification(
        'error',
        'Same Password',
        'Current and new password cannot be the same.'
      );
    }
    authService
      .updatePassword(currentPassword, newPassword)
      .then(() => {
        setConfirmLoading(false);
        Notification(
          'success',
          'Password Updated',
          'Your password has been successfully updated.'
        );
        form.resetFields();
        close(false);
      })
      .catch((error) => {
        Notification(
          'error',
          error.response.data.error,
          'The current password is not correct.'
        );
      });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {confirmLoading ? (
        <div>Loading</div>
      ) : (
        <FormStyled
          layout="vertical"
          name="change_password"
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            label="Confirm Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: 'Please write your current password.',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="New Password">
            <PasswordRulesDiv>
              Password must be 8-20 characters, including: at least one capital
              letter, at least one small letter, one number and one special
              character - ! @ # $ % ^ & * ( ) _ +
            </PasswordRulesDiv>
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
                  message: 'Must be a minimum of 8 characters',
                },
                {
                  pattern: passwordRegex,
                  message:
                    'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
                },
              ]}
            >
              <Input.Password type="password" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Confirm  New Password"
            name="confirm"
            dependencies={['newPassword']}
            hasFeedback
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
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
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
      )}
    </>
  );
};

export default UpdatePassword;
