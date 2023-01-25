/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { Card, Modal } from 'antd';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../../App';
import Notification from '../../../Notification/Notification';
import {
  StyledBookCardWrapper,
  StyledCard,
  StyledModalBookCardWrapper,
  StyledModalCard,
} from './style';

const { Meta } = Card;

const BookCard = ({ data }) => {
  const { authService, bookService, updateService } = useContext(UserContext);
  const { title, photoUrl, user } = data;
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal(!showModal);

  const handleOk = () => setShowModal(!showModal);

  const handleCancel = () => setShowModal(!showModal);

  const handleDelete = () => {
    bookService
      .deleteBook(authService.bearerHeader, data.id)
      .then(() => {
        bookService
          .deleteImageInS3(authService.bearerHeader, data.s3Key)
          .then(() => {
            bookService.bookList = bookService.bookList.filter(
              (book) => book.id !== data.id
            );
            setShowModal(!showModal);
            Notification(
              'success',
              'Book Deleted',
              'The Book was successfully deleted.'
            );
            updateService();
          })
          .catch(() => {
            Notification(
              'error',
              'Unauthorized',
              'User is not authorized to delete.'
            );
          });
      })
      .catch(() => {
        Notification(
          'error',
          'Delete Book Error',
          'There was a problem with the connection. The Book was not deleted'
        );
      });
  };

  return (
    <StyledBookCardWrapper>
      <StyledCard
        hoverable
        cover={
          <img
            style={{ maxWidth: 500, maxHeight: 500 }}
            alt="Book Cover"
            src={photoUrl}
          />
        }
        actions={[<FullscreenOutlined onClick={handleModal} key="setting" />]}
      >
        <Meta title={title} description={name} />
      </StyledCard>

      <Modal
        title={title}
        visible={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ ghost: true }}
        okText={<FullscreenExitOutlined />}
        destroyOnClose
      >
        <StyledModalBookCardWrapper>
          <StyledModalCard
            cover={
              <img
                style={{ width: 300, height: 300 }}
                alt="Book Cover"
                src={photoUrl}
              />
            }
            actions={[<DeleteOutlined onClick={handleDelete} key="delete" />]}
          >
            <Meta title={title} description={name} />
          </StyledModalCard>
        </StyledModalBookCardWrapper>
      </Modal>
    </StyledBookCardWrapper>
  );
};

export default BookCard;
