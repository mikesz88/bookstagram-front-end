import React, { useState, useContext, useEffect } from 'react';
import { Input, Button, Select, Form } from 'antd';
import { FormStyled } from './styles';
import { UserContext } from '../../../../App';
import { Notification } from '../../../Notification/Notification';
import { forgotPasswordQuestions } from '../../../../constants/forgotPasswordQuestions';

const UpdateForgotQA = ({ close }) => {
  const { authService } = useContext(UserContext);
  const [form] = Form.useForm();
  const [forgottenQuestion, setForgottenQuestion] = useState(authService.forgotPasswordQuestion)

  const onSubmit = values => {
    const { 
      confirm, 
      newForgotPasswordQuestion, 
      newForgotPasswordAnswer 
    } = values;
    console.log('test1');
    if (confirm === newForgotPasswordAnswer) {
      return Notification(
        'error',
        'Same Password Answer',
        'Current and new forgotten password cannot be the same.'
        );
      }
    console.log('test', values);
    authService.updateForgot(
      confirm,
      newForgotPasswordQuestion,
      newForgotPasswordAnswer
    )
      .then(() => {
        console.log('update successful');
        close(false)
        Notification(
          'success',
          'Forgot Question/Password Updated',
          'Your forgotten question and password has been successfully updated.'
          )
        form.resetFields()
      })
      .catch((error) => {
        console.log(error);
        Notification(
          'error', 
          'Invalid Information', 
          error.response.data.error
        )
      })
  };

  const onForgotQuestionChange = value => {
    setForgottenQuestion(value);
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

  const closeModal = () => {
    form.resetFields();
    close();
  }

  useEffect(() => {
    authService.forgotPasswordQuestion = forgottenQuestion
  },[authService, forgottenQuestion])

  return (
    <FormStyled
      layout='vertical'
      name='register_user'
      onFinish={onSubmit}
      form={form}
    >
      <div style={{ marginBottom: '1rem' }}>
        <div>Current Question: </div>
        <div style={{ fontWeight: 'bold' }}>{authService.forgotPasswordQuestion}</div>
      </div>
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
            question !== forgottenQuestion 
            ?  <Select.Option key={Date.now() + index} value={question}>{question}</Select.Option>
            : ''
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Write your 'Forgot a Password' Answer"
        name="newForgotPasswordAnswer"
        rules={[
          {
            required: true,
            message: 'Please input your last name.'
          }
        ]}
      >
        <Input.Password />
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
  )
}

export default UpdateForgotQA