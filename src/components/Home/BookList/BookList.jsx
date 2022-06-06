/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import BookCard from './BookCard/BookCard';
import { StyledCardWrapper } from '../FilterBar/styles';

const BookList = ({ filteredWord }) => {
  const { bookService } = useContext(UserContext);
  const [bookList, setBookList] = useState(bookService.bookList);

  useEffect(() => {
    bookService
      .getBookList()
      .then(() => setBookList(bookService.bookList))
      .catch(() => setBookList('error'));
  }, []);

  useEffect(() => {
    setBookList(bookService.bookList);
  }, [bookService.bookList.length]);

  const searchWords = (title, searchWord) => {
    const titleArray = title.split(' ');
    return !!titleArray.some((word) => word.includes(searchWord.toLowerCase()));
  };

  return (
    <StyledCardWrapper>
      {bookList
        .filter((book) => searchWords(book.title.toLowerCase(), filteredWord))
        .map((data) => (
          <BookCard data={data} key={data.id + Date.now()} />
        ))}
    </StyledCardWrapper>
  );
};

export default BookList;
