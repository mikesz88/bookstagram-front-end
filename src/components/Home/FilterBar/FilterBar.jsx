/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import { StyledLoginButton } from '../../ReusableCSS/index';
import BookCard from './BookCard/BookCard';
import Notification from '../../Notification/Notification';
import {
  StyledCardWrapper,
  StyledDivWrapper,
  StyledFilterContainer,
  StyledInput,
} from './styles';

const FilterBar = () => {
  const { bookService } = useContext(UserContext);
  const [bookList, setBookList] = useState(bookService.bookList);
  const [filterWord, setFilterWord] = useState('');

  const handleChange = ({ target: { value } }) => setFilterWord(value);

  const refreshBookList = () => {
    bookService
      .getBookList()
      .then(() => {
        setBookList(bookService.bookList);
        Notification(
          'info',
          'Refresh Successful',
          'You are now seeing the latest books!'
        );
      })
      .catch(() => setBookList('error'));
  };

  useEffect(() => {
    bookService
      .getBookList()
      .then(() => setBookList(bookService.bookList))
      .catch(() => setBookList('error'));
  }, []);

  const searchWords = (title, searchWord) => {
    const titleArray = title.split(' ');
    return !!titleArray.some((word) => word.includes(searchWord.toLowerCase()));
  };

  return (
    <StyledDivWrapper>
      <StyledFilterContainer>
        <StyledInput type="text" name="filter" onChange={handleChange} />
        <StyledLoginButton onClick={refreshBookList}>Refresh</StyledLoginButton>
      </StyledFilterContainer>
      <StyledCardWrapper>
        {bookList
          .filter((book) => searchWords(book.title.toLowerCase(), filterWord))
          .map((data) => (
            <BookCard data={data} key={data.id + Date.now()} />
          ))}
      </StyledCardWrapper>
    </StyledDivWrapper>
  );
};

export default FilterBar;
