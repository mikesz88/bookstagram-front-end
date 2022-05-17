import React, { useState, useContext } from 'react'
import { Button, Modal, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Notification } from '../../Notification/Notification';
import UpdatePersonalInformation from './UpdatePersonalInformation/UpdatePersonalInformation';
import UpdatePassword from './UpdatePassword/UpdatePassword';
import UpdateForgotQA from './UpdateForgotQA/UpdateForgotQA';
import UploadModal from './UploadModal/UploadModal';

const { confirm } = Modal;

const HomeNavbar = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visiblePersonalDrawer, setVisiblePersonalDrawer] = useState(false);
  const [visiblePasswordDrawer, setVisiblePasswordDrawer] = useState(false);
  const [visibleForgotDrawer, setVisibleForgotDrawer] = useState(false);
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();


  const showModal = () => setVisibleModal(!visibleModal);
  const showDrawer = () => setVisibleDrawer(!visibleDrawer)
  const showPersonalDrawer = () => setVisiblePersonalDrawer(!visiblePersonalDrawer);
  const showPasswordDrawer = () => setVisiblePasswordDrawer(!visiblePasswordDrawer);
  const showForgotDrawer = () => setVisibleForgotDrawer(!visibleForgotDrawer);


  const handleOk = () =>{
    confirm({
      title: 'Preview',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions', // preview
      onOk() {
        setConfirmLoading(false);
        showModal()
      },
      onCancel() {
        setConfirmLoading(false);
      },
    });
  }

  const handleModalCancel = () => {
    setConfirmLoading(false);
    showModal()
  };

  const logout = () => {
    confirm({
      title: 'Logout',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to logout?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        authService.logoutUser()
          .then(() => navigate('/'))
          .catch(() => {
            Notification(
              'error',
              'Connection Error',
              'Unable to Logout. Please try again later.'
            )
          })
      }
    })
  };

  const deleteAccount = () => {
    confirm({
      title: 'Delete Account',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete your account?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        confirm({
          title: 'Last chance!',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you ABSOLUTELY sure you want to delete your account?',
          okText: 'Yes',
          cancelText: 'No',
          onOk() {
            authService.deleteSelf()
          .then(() => {
            Notification(
              'success',
              'Account Deleted',
              'Your account has been deleted. You must create a new one.'
            )
            navigate('/')
          })
          .catch((error) => {
            console.log(error);
            Notification(
              'error',
              'Connection Error',
              `${error.response.data.error} Unable to delete account. Please try again later.`
            )
          })
          }
        })
      }
    })
  };

  return (
    <>
      <nav style={{ maxWidth: 1200, margin: 'auto' }}>
        <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
          <li>
          <Button><Link to="/home">Home</Link></Button>
          </li>
          <div style={{ display: 'flex', width: 250, justifyContent: 'space-evenly'}}>
            <li>
              <Button onClick={showModal}>Upload Photo</Button>
            </li>
            <li>
              <Button onClick={showDrawer}>Profile</Button>
            </li>
            <li>
              <Button onClick={logout}>Logout</Button>
            </li>
          </div>
        </ul>
      </nav>

      <Modal // Upload Photo
        title="Upload Photo"
        visible={visibleModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleModalCancel}
        destroyOnClose
      >
        <UploadModal showModal={showModal}/>
      </Modal>

      <Drawer 
        title="Profile" 
        placement="right" 
        width={320}
        onClose={showDrawer} 
        visible={visibleDrawer}
      >
        <Button onClick={showPersonalDrawer} >Update Personal Information</Button>
        <Drawer
            title="Update Personal Information"
            width={320}
            onClose={showPersonalDrawer}
            visible={visiblePersonalDrawer}
        >
          <UpdatePersonalInformation close={showPersonalDrawer} />
        </Drawer>
        <Button onClick={showPasswordDrawer} >Update Password</Button>
        <Drawer
            title="Update Password"
            width={320}
            onClose={showPasswordDrawer}
            visible={visiblePasswordDrawer}
        >
          <UpdatePassword close={showPasswordDrawer} />
        </Drawer>
        <Button onClick={showForgotDrawer} >Update Forgot Question and Answer</Button>
        <Drawer
            title="Update Forgot Question and Answer"
            width={320}
            onClose={showForgotDrawer}
            visible={visibleForgotDrawer}
        >
          <UpdateForgotQA close={showForgotDrawer} />
        </Drawer>
        <Button onClick={deleteAccount} >Delete Account</Button>
      </Drawer>
    </>
  )
}

export default HomeNavbar