import axios from "axios";
import { Endpoints } from "../constants/endpoints";

export class BookService {
  constructor() {
    this.bookList = [];
    this.s3Url = '';
    this.s3Key = '';
  }

  setBookList(newBookList) {
    this.bookList = newBookList;
  }

  setS3Url(url) {
    this.s3Url = url;
  }

  setS3Key(key) {
    this.s3Key = key;
  }

  resetS3TempInfo() {
    this.s3Url = '';
    this.s3Key = '';
  }

  async getBookList() {
    try {
      const response = await axios.get(Endpoints.urlGetBooks);
      this.setBookList([]);
      response.data.data.forEach(book => {
        const filteredBook = {
          id: book._id,
          title: book.title,
          photoUrl: book.photoUrl,
          user: book.user,
          createdAt: book.createdAt,
        }
        this.setBookList([...this.bookList, filteredBook])
      })
    } catch (error) {
      throw error;
    }
  }

  async createS3Url(headers) {
    try {
      const response = await axios.get(Endpoints.urlGetS3Url, { headers });
      this.setS3Url(response.data.photoUrl)
      this.setS3Key(response.data.key)
    } catch (error) {
      throw error;
    }
  }

  async deleteImageInS3(headers, key) {
    try {
      return await axios.delete(`${Endpoints.urlDeleteImageInS3}/${key}`, { headers })
    } catch (error) {
      throw error
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

  async createNewBook(url, title, key, headers, userId) {
    console.log(url, 'url');
    console.log(headers, 'headers');
    console.log(key, 'key');
    const body = {
      "title": title,
      "photoUrl": url.split('?')[0],
      "s3Key": key
    }
    try {
      await axios.post(Endpoints.urlCreateBook, body, { headers })
      const filteredBook = {
        title,
        photoUrl: url.split('?')[0],
        user: userId,
        s3Key: key,
        createdAt: Date.now(),
      }
      this.setBookList([filteredBook, ...this.bookList])
      this.resetS3TempInfo();
    } catch (error) 
    {
      throw error;
    }
  }

  async deleteBook(headers, bookId) {
    try {
      return await axios.delete(`${Endpoints.urlDeleteBook}/${bookId}`, { headers })
    } catch (error) {
      throw error;
    }
  }
}