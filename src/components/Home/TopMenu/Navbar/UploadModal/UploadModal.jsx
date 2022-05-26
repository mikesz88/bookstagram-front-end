/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import { Input, Form, Upload, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UserContext } from '../../../../../App';
import Notification from '../../../../Notification/Notification';
import {
  StyledHeaderPImport,
  StyledIconP,
  StyledSubTextPImport,
} from './styles';

const { Dragger } = Upload;

const UploadModal = ({ showModal, form }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authService, bookService } = useContext(UserContext);

  const onSubmit = (values) => {
    const { bookTitle } = values;
    setIsLoading(true);
    bookService
      .createNewBook(
        bookService.s3Url,
        bookTitle,
        bookService.s3Key,
        authService.bearerHeader,
        authService.id
      )
      .then(() => {
        Notification(
          'success',
          'Upload Successful',
          'Your book title and image has been uploaded.'
        );
        Notification(
          'info',
          'Please Refresh',
          'Click the refresh button to see your post in the book feed!'
        );
        showModal();
        form.resetFields();
        setIsLoading(false);
      })
      .catch(() => {
        Notification(
          'error',
          'Error',
          'There was a connection error. Please try again.'
        );
      });
  };

  const handleUpload = ({ onSuccess, onError, file }) => {
    setIsLoading(true);
    bookService
      .createS3Url(authService.bearerHeader)
      .then(() => {
        bookService.uploadImageToS3(bookService.s3Url, file).then(() => {
          onSuccess();
          setIsLoading(false);
          Notification(
            'success',
            'Upload Successful',
            'Your book image has been uploaded.'
          );
        });
      })
      .catch(() => {
        onError();
        setIsLoading(false);
        Notification('error', 'Upload Failed', 'There was an error uploading.');
      });
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const props = {
    name: 'file',
    customRequest: handleUpload,
    // showUploadList: false,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // this is the api call section
    maxCount: 1,
    progress: {
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    onRemove: () => {
      bookService.deleteImageInS3(authService.bearerHeader, bookService.s3Key);
      return true;
    },
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      const isJPG = file.type === 'image/jpg';
      const isJPEG = file.type === 'image/jpeg';
      if (!isPNG && !isJPG && !isJPEG) {
        Notification(
          'error',
          'Wrong File Type',
          `${file.name} is not a png, jpg, or jpeg file`
        );
        return isPNG || isJPG || isJPEG || Upload.LIST_IGNORE;
      }
      return true;
    },
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        layout="vertical"
        name="uploadBookAndTitle"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Book Title"
          name="bookTitle"
          rules={[
            {
              required: true,
              message: 'Please write a book title',
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Upload Photo">
          <Form.Item
            name="uploadPhoto"
            valuePropName="fileList"
            getValueFromEvent={getFile}
            noStyle
            rules={[
              {
                required: true,
                message: 'Please upload a photo',
              },
            ]}
          >
            <Dragger {...props}>
              <StyledIconP>
                <InboxOutlined />
              </StyledIconP>
              <StyledHeaderPImport>
                Click or drag file to this area to upload
              </StyledHeaderPImport>
              <StyledSubTextPImport>
                Support for a single upload.
              </StyledSubTextPImport>
            </Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UploadModal;
/* <Button disabled={!bookTitle || !fileList} onClick={handleUpload}>{bookTitle && fileList? 'Click to Submit' : 'Missing Title or Image'}</Button> */
/* <div>{!fileList ? 'Insert a file' : fileList ? 'Uploading' : 'Complete'}</div> */
