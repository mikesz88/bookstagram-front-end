import axios from "axios";
import { Endpoints } from "../constants/endpoints";

export class BookService {
  constructor() {
    this.bookList = [];
    this.s3Url = '';
  }

  setBookList(newBookList) {
    this.bookList = newBookList;
  }

  setS3Url(url) {
    this.s3Url = url;
  }

  async getBookList() {
    try {
      const response = await axios.get(Endpoints.urlGetBooks);
      this.setBookList(response.data.data);
    } catch (error) {
      throw error;
    }
  }

  async createS3Url(headers) {
    try {
      const response = await axios.get(Endpoints.urlGetS3Url, { headers });
      this.setS3Url(response.data.photoUrl)
    } catch (error) {
      throw error;
    }
  }

  async uploadImageToS3(url, file) {
    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: file
      })
    } catch (error) {
      throw error;
    }
  }

  async createNewBook(url, title, headers) {
    console.log(url, 'url');
    console.log(headers, 'headers');
    const body = {
      "title": title,
      "photoUrl": url.split('?')[0],
    }
    try {
      await axios.post(Endpoints.urlCreateBook, body, { headers })
      this.getBookList();
    } catch (error) {
      throw error;
    }
  }
}