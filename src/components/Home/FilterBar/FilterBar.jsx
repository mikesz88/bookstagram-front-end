import { Input } from 'antd';
import React,{ useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../App.js';
import { StyledLoginButton } from '../../ReusableCSS/index.js';
import BookCard from './BookCard/BookCard.jsx';
import { 
  StyledCardWrapper, 
  StyledDivWrapper, 
  StyledFilterContainer, 
  StyledInput 
} from './styles.js';


const FilterBar = () => {
  const { bookService } = useContext(UserContext);
  const [bookList, setBookList] = useState(bookService.bookList);
  const [filterWord, setFilterWord] = useState('');

  const handleChange = ({ target: { value }}) => setFilterWord(value);

  const refreshBookList = () => {
    bookService.getBookList()
    .then(() => setBookList(bookService.bookList))
    .catch((error) => console.log(error))
  };

  useEffect(() => {
    console.log('test');
    bookService.getBookList()
    .then(() => setBookList(bookService.bookList))
    .catch((error) => console.log(error))
  }, [])

  const searchWords = (title, searchWord) => {
    const titleArray = title.split(' ');
    return titleArray.some(word => word.includes(searchWord.toLowerCase())) ? true : false;
  }

  return (
    <StyledDivWrapper>
        <StyledFilterContainer>
          <StyledInput type="text" name="filter" onChange={handleChange} />
          <StyledLoginButton onClick={refreshBookList}>Refresh</StyledLoginButton>
        </StyledFilterContainer>
      <StyledCardWrapper>
        {bookList
          .filter(book => searchWords(book.title.toLowerCase(), filterWord))
          .map((data, index) => (
            <BookCard data={data}  key={index} />
            ))
        } 
      </StyledCardWrapper>
    </StyledDivWrapper>
  )
}

export default FilterBar