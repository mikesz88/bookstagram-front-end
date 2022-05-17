const BASE_URL = 'http://localhost:5000/api/v1';
const URL_AUTH = `${BASE_URL}/auth`;
const URL_BOOKS = `${BASE_URL}/books`

export const Endpoints = {
  urlLogin: `${URL_AUTH}/login`,
  urlRegister: `${URL_AUTH}/register`,
  urlGetUser: `${URL_AUTH}/me`,
  urlUpdateUser: `${URL_AUTH}/updatedetails`,
  urlUpdatePassword: `${URL_AUTH}/updatepassword`,
  urlLogout: `${URL_AUTH}/logout`,
  urlUpdateForgot: `${URL_AUTH}/updateforgot`,
  urlDeleteSelf: `${URL_AUTH}/deleteself`,
  urlGetBooks: `${URL_BOOKS}`,
  urlGetS3Url: `${URL_BOOKS}/get/s3url`,
  urlCreateBook: `${URL_BOOKS}`
}