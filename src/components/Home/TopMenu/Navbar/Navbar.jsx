/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import { Modal, Drawer, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UserContext } from '../../../../App';
import { StyledLoginButton } from '../../../ReusableCSS';
import Notification from '../../../Notification/Notification';
import UpdatePersonalInformation from './UpdatePersonalInformation/UpdatePersonalInformation';
import UpdatePassword from './UpdatePassword/UpdatePassword';
import UpdateForgotQA from './UpdateForgotQA/UpdateForgotQA';
import UploadModal from './UploadModal/UploadModal';

const { confirm } = Modal;

const Navbar = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visiblePersonalDrawer, setVisiblePersonalDrawer] = useState(false);
  const [visiblePasswordDrawer, setVisiblePasswordDrawer] = useState(false);
  const [visibleForgotDrawer, setVisibleForgotDrawer] = useState(false);
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const showModal = () => setVisibleModal(!visibleModal);
  const showDrawer = () => setVisibleDrawer(!visibleDrawer);
  const showPersonalDrawer = () =>
    setVisiblePersonalDrawer(!visiblePersonalDrawer);
  const showPasswordDrawer = () =>
    setVisiblePasswordDrawer(!visiblePasswordDrawer);
  const showForgotDrawer = () => setVisibleForgotDrawer(!visibleForgotDrawer);

  const handleOk = () => {
    setConfirmLoading(false);
    form.submit();
  };

  const handleModalCancel = () => {
    setConfirmLoading(false);
    form.resetFields();
    showModal();
  };

  const logout = () => {
    confirm({
      title: 'Logout',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to logout?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        authService
          .logoutUser()
          .then(() => {
            navigate('/');
            Notification(
              'success',
              'Logout Successful',
              'You must now login again.'
            );
          })
          .catch(() => {
            Notification(
              'error',
              'Connection Error',
              'Unable to Logout. Please try again later.'
            );
          });
      },
    });
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
            authService
              .deleteSelf()
              .then(() => {
                Notification(
                  'success',
                  'Account Deleted',
                  'Your account has been deleted. You must create a new one.'
                );
                navigate('/');
              })
              .catch((error) => {
                Notification(
                  'error',
                  'Connection Error',
                  `${error.response.data.error} Unable to delete account. Please try again later.`
                );
              });
          },
        });
      },
    });
  };

  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <li>
            <StyledLoginButton onClick={showModal}>
              Upload Photo
            </StyledLoginButton>
          </li>
          <li>
            <StyledLoginButton onClick={showDrawer}>Profile</StyledLoginButton>
          </li>
          <li>
            <StyledLoginButton onClick={logout}>Logout</StyledLoginButton>
          </li>
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
        <UploadModal showModal={showModal} form={form} />
      </Modal>

      <Drawer
        title="Profile"
        placement="right"
        width={320}
        onClose={showDrawer}
        visible={visibleDrawer}
      >
        <StyledLoginButton
          style={{ margin: '1rem auto', width: '260px' }}
          onClick={showPersonalDrawer}
        >
          Update Personal Information
        </StyledLoginButton>
        <Drawer
          title="Update Personal Information"
          width={320}
          onClose={showPersonalDrawer}
          visible={visiblePersonalDrawer}
        >
          <UpdatePersonalInformation close={showPersonalDrawer} />
        </Drawer>
        <StyledLoginButton
          style={{ margin: '1rem auto', width: '260px' }}
          onClick={showPasswordDrawer}
        >
          Update Password
        </StyledLoginButton>
        <Drawer
          title="Update Password"
          width={320}
          onClose={showPasswordDrawer}
          visible={visiblePasswordDrawer}
        >
          <UpdatePassword close={showPasswordDrawer} />
        </Drawer>
        <StyledLoginButton
          style={{ margin: '1rem auto', width: '260px' }}
          onClick={showForgotDrawer}
        >
          Update Forgot Question and Answer
        </StyledLoginButton>
        <Drawer
          title="Update Forgot Question and Answer"
          width={320}
          onClose={showForgotDrawer}
          visible={visibleForgotDrawer}
        >
          <UpdateForgotQA close={showForgotDrawer} />
        </Drawer>
        <StyledLoginButton
          style={{ margin: '1rem auto', width: '260px' }}
          onClick={deleteAccount}
        >
          Delete Account
        </StyledLoginButton>
      </Drawer>
    </div>
  );
};

export default Navbar;
