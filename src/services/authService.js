/* eslint-disable no-shadow */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../constants/endpoints';
import User from './userServices';

const headers = { 'Content-Type': 'application/json' };

class AuthService extends User {
  constructor() {
    super();
    this.authToken = '';
    this.bearerHeader = {};
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  setBearerHeader(token) {
    this.bearerHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  resetUser() {
    this.id = '';
    this.authToken = '';
    this.bearerHeader = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.role = '';
    this.forgotPasswordQuestion = '';
    this.isLoggedIn = false;
  }

  getBearerHeader() {
    return this.bearerHeader;
  }

  async registerUser(
    firstName,
    lastName,
    email,
    role,
    forgotPasswordQuestion,
    forgotPasswordAnswer,
    password
  ) {
    const body = {
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      role,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
    };
    try {
      const response = await axios.post(Endpoints.urlRegister, body);
      this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
      this.setIsLoggedIn(true);
      await this.getUser();
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    const body = {
      email: email.toLowerCase(),
      password,
    };
    try {
      const response = await axios.post(Endpoints.urlLogin, body, { headers });
      this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
      this.setIsLoggedIn(true);
      await this.getUser();
    } catch (error) {
      throw error;
    }
  }

  async logoutUser() {
    const headers = this.getBearerHeader();
    try {
      await axios.get(Endpoints.urlLogout, { headers });
      this.resetUser();
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    const headers = this.getBearerHeader();
    try {
      const response = await axios.get(Endpoints.urlGetUser, { headers });
      this.setUserData(response.data.data);
    } catch (error) {
      throw error;
    }
  }

  async findUserName(id) {
    const headers = this.getBearerHeader();
    try {
      return await axios.get(`${Endpoints.urlFindUserName}/${id}`, { headers });
    } catch (error) {
      throw error;
    }
  }

  async updateUserDetails(requestBody) {
    const headers = this.getBearerHeader();
    try {
      const response = await axios.put(
        Endpoints.urlUpdateUser,
        JSON.stringify(requestBody),
        {
          headers,
        }
      );
      this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
      this.getUser();
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(currentPassword, newPassword) {
    const headers = this.getBearerHeader();
    const body = {
      currentPassword,
      newPassword,
    };
    try {
      const response = await axios.put(Endpoints.urlUpdatePassword, body, {
        headers,
      });
      this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
    } catch (error) {
      throw error;
    }
  }

  async updateForgot(
    currentForgotAnswer,
    newForgotPasswordQuestion,
    newForgotPasswordAnswer
  ) {
    const headers = this.getBearerHeader();
    const body = {
      currentForgotAnswer,
      newForgotPasswordQuestion,
      newForgotPasswordAnswer,
    };
    try {
      const response = await axios.put(Endpoints.urlUpdateForgot, body, {
        headers,
      });
      this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
    } catch (error) {
      throw error;
    }
  }

  async deleteSelf() {
    const headers = this.getBearerHeader();
    const { id } = this;
    this.logoutUser();
    try {
      await axios.delete(`${Endpoints.urlDeleteSelf}/${id}`, { headers });
    } catch (error) {
      throw error;
    }
  }

  async forgotQuestion(userEmail) {
    const body = {
      email: userEmail,
    };
    try {
      return await axios.put(Endpoints.urlGetForgotQuestion, body, { headers });
    } catch (error) {
      throw error;
    }
  }

  async verifyForgotPassword(email, forgotAnswer) {
    const body = {
      email,
      forgotPasswordAnswer: forgotAnswer,
    };
    try {
      return await axios.post(Endpoints.urlVerifyForgotPassword, body, {
        headers,
      });
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(resettoken, newPassword) {
    const headers = this.getBearerHeader();
    const body = {
      password: newPassword,
    };
    try {
      await axios.put(`${Endpoints.urlResetPassword}/${resettoken}`, body, {
        headers,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
