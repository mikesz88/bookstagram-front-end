/* eslint-disable import/no-cycle */
import React, { useState, useContext, useEffect } from 'react';
import { Input, Button, Select, Form } from 'antd';
import {
  StyledButtonWrapper,
  StyledFormDrawer as FormStyled,
} from '../../../../ReusableCSS';
import { UserContext } from '../../../../../App';
import Notification from '../../../../Notification/Notification';
import forgotPasswordQuestions from '../../../../../constants/forgotPasswordQuestions';
import { StyledDivBold, StyledDivMarginBottom } from './style';

const UpdateForgotQA = ({ close }) => {
  const { authService } = useContext(UserContext);
  const [form] = Form.useForm();
  const [forgottenQuestion, setForgottenQuestion] = useState(
    authService.forgotPasswordQuestion
  );

  // eslint-disable-next-line consistent-return
  const onSubmit = (values) => {
    const { confirm, newForgotPasswordQuestion, newForgotPasswordAnswer } =
      values;
    if (confirm === newForgotPasswordAnswer) {
      return Notification(
        'error',
        'Same Password Answer',
        'Current and new forgotten password cannot be the same.'
      );
    }
    authService
      .updateForgot(confirm, newForgotPasswordQuestion, newForgotPasswordAnswer)
      .then(() => {
        close(false);
        Notification(
          'success',
          'Forgot Question/Password Updated',
          'Your forgotten question and password has been successfully updated.'
        );
        form.resetFields();
      })
      .catch((error) => {
        Notification('error', 'Invalid Information', error.response.data.error);
      });
  };

  const onForgotQuestionChange = (value) => {
    setForgottenQuestion(value);
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

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    authService.forgotPasswordQuestion = forgottenQuestion;
  }, [authService, forgottenQuestion]);

  return (
    <FormStyled
      layout="vertical"
      name="register_user"
      onFinish={onSubmit}
      form={form}
    >
      <StyledDivMarginBottom>
        <div>Current Question: </div>
        <StyledDivBold>{authService.forgotPasswordQuestion}</StyledDivBold>
      </StyledDivMarginBottom>
      <Form.Item
        label="Confirm Answer"
        name="confirm"
        rules={[
          {
            required: true,
            message: 'Please confirm your question!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Pick a NEW 'Forgot a Password' Question"
        name="newForgotPasswordQuestion"
        rules={[
          {
            required: true,
            message: 'Please input your last name.',
          },
        ]}
      >
        <Select
          placeholder="Pick a question"
          onChange={onForgotQuestionChange}
          allowClear
        >
          {forgotPasswordQuestions.map((question) =>
            question !== forgottenQuestion ? (
              <Select.Option key={question} value={question}>
                {question}
              </Select.Option>
            ) : (
              ''
            )
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label="Write your 'Forgot a Password' Answer"
        name="newForgotPasswordAnswer"
        rules={[
          {
            required: true,
            message: 'Please input your last name.',
          },
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
  );
};

export default UpdateForgotQA;
