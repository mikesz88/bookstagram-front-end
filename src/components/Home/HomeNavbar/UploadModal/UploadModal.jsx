import React, { useState, useContext } from 'react'
import { Upload, message, Button, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UserContext } from '../../../../App';
import { Notification } from '../../../Notification/Notification';

const { Dragger } = Upload;

const UploadModal = ({ showModal }) => {
  const { authService, bookService } = useContext(UserContext);
  const [bookTitle, setBookTitle] = useState('');
  const [bookTitleButton, setBookTitleButton] = useState(false);
  /* 
1. input title
3. fileList.forEach is not necessary (confirm)
4. Tie this to the modal Confirm and actions to then load onto the screen.
5. Connect the home page to show the updated bookList appropriately.
6. Make api calls stack into one or two functions rather than chaining with then?
*/

  const handleTitle = ({ target: { value} }) => setBookTitle(value);

  const handleUpload = ({onSuccess, onError, file}) => {
    bookService.createS3Url(authService.bearerHeader)
      .then(() => {
        bookService.uploadImageToS3(bookService.s3Url, file)
        .then(() => {
          bookService.createNewBook(bookService.s3Url, bookTitle, authService.bearerHeader)
          .then(() => {
            bookService.getBookList();
            onSuccess();
          })
          .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
      })
      .then(() => {
        file = '';
        setBookTitle('');
        setBookTitleButton(false);
        showModal();
      })
      .catch(error => {
        console.log(error)
        onError();
      });
      return true;
  }

  const props = {
    name: 'file',
    customRequest: handleUpload,
    // showUploadList: false,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // this is the api call section
    maxCount: 1,
    progress: {
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
    // onRemove: () => {
    //   console.log(fileList, 'file');
    //   setFileList('');
    //   console.log(fileList, 'file after empty');
    //   return true;
    // },
    beforeUpload: file => {
      const isPNG = file.type === 'image/png';
      const isJPG = file.type === 'image/jpg';
      const isJPEG = file.type === 'image/jpeg';
      if (!isPNG && !isJPG && !isJPEG) {
        message.error(`${file.name} is not a png, jpg, or jpeg file`);
        return (isPNG || isJPG || isJPEG) || Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      console.log(info);
      const { status } = info.file;
      console.log(status, 'status');
      if (status !== 'uploading') {
        console.log('uploading');
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log('done');
        // message.success(`${info.file.name} file uploaded successfully.`);
        Notification('success', 'Upload Successful', 'Your book title and image has been uploaded.')
        console.log(info.file);

      } else if (status === 'error') {
        console.log('error');
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };


  return (
    <>
      <Input type='text' value={bookTitle} onChange={handleTitle} placeholder='Book Title'/>
      <Button onClick={() => setBookTitleButton(true)}>Submit Title</Button>
      {bookTitleButton &&
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
      }
    </>
  )
}

export default UploadModal
/* <Button disabled={!bookTitle || !fileList} onClick={handleUpload}>{bookTitle && fileList? 'Click to Submit' : 'Missing Title or Image'}</Button> */
/* <div>{!fileList ? 'Insert a file' : fileList ? 'Uploading' : 'Complete'}</div> */