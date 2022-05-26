const BASE_URL = 'http://localhost:5000/api/v1';
const URL_AUTH = `${BASE_URL}/auth`;
const URL_BOOKS = `${BASE_URL}/books`;

const Endpoints = {
  urlLogin: `${URL_AUTH}/login`,
  urlRegister: `${URL_AUTH}/register`,
  urlGetUser: `${URL_AUTH}/me`,
  urlFindUserName: `${URL_AUTH}/findusername`,
  urlUpdateUser: `${URL_AUTH}/updatedetails`,
  urlUpdatePassword: `${URL_AUTH}/updatepassword`,
  urlLogout: `${URL_AUTH}/logout`,
  urlGetForgotQuestion: `${URL_AUTH}/forgotquestion`,
  urlVerifyForgotPassword: `${URL_AUTH}/forgotpassword`,
  urlUpdateForgot: `${URL_AUTH}/updateforgot`,
  urlDeleteSelf: `${URL_AUTH}/deleteself`,
  urlResetPassword: `${URL_AUTH}/resetpassword`,
  urlGetBooks: `${URL_BOOKS}`,
  urlGetS3Url: `${URL_BOOKS}/get/s3url`,
  urlDeleteImageInS3: `${URL_BOOKS}/deletes3image`,
  urlCreateBook: `${URL_BOOKS}`,
  urlDeleteBook: `${URL_BOOKS}`,
};

export default Endpoints;
