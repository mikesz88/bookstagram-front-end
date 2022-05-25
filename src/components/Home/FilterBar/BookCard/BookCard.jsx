import { Card, Modal } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../../App';
import { Notification } from '../../../Notification/Notification';

const { Meta } = Card;

const BookCard = ({ data }) => {
  const { authService, bookService } = useContext(UserContext);
  const { title, photoUrl, user } = data;
  const [name, setName] = useState(user)
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('book User Id', user);
    authService.findUserName(user)
      .then(res => setName(`${res.data.data.firstName} ${res.data.data.lastName}`))
  }, [authService, user]);

const handleModal = () => setShowModal(!showModal);

const handleOk = () => setShowModal(!showModal);

const handleCancel = () => setShowModal(!showModal);

const handleDelete = () => {
  console.log(data);
  bookService.deleteBook(authService.bearerHeader, data.id)
    .then(() => {
      bookService.deleteImageInS3(authService.bearerHeader, data.s3Key)
      .then(() => {
        console.log('successful')
        bookService.bookList = bookService.bookList.filter((book) => book.id !== data.id)
        setShowModal(!showModal);
        Notification('success', 'Book Deleted', 'The Book was successfully deleted.');
      })
      .catch((err) => {
        console.log(err)
        Notification('error', 'Unauthorized', 'User is not authorized to delete.');
      })
    })
    .catch((err) => {
      console.log(err);
      Notification('error', 'Delete Book Error', 'There was a problem with the connection. The Book was not deleted');
    })
};

  return (
    <div style={{ margin: '0 auto 1.5rem auto', maxWidth: '500px' }}>
      <Card
        hoverable
        style={{ maxWidth: 500, cursor: 'default' }}
        cover={<img style={{maxWidth: 500, maxHeight: 500}} alt="Book Cover" src={photoUrl} />}
        actions={[
          <FullscreenOutlined onClick={handleModal} key="setting" />
        ]}
      >
        <Meta title={title} description={name} />
    </Card>

    <Modal
      title={title}
      visible={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ghost: true}}
      okText={<FullscreenExitOutlined />}
      destroyOnClose
    >
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Card
          style={{ width: 300 }}
          cover={<img style={{width: 300, height: 300}} alt="Book Cover" src={photoUrl} />}
          actions={[
            <DeleteOutlined onClick={handleDelete} key='delete' />
          ]}
          >
          <Meta title={title} description={name} />
        </Card>
      </div>
    </Modal>
  </div>
  )
}

export default BookCard