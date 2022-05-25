import { Input } from 'antd';
import React,{ useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../App.js';
import { StyledLoginButton } from '../../ReusableCSS/index.js';
import BookCard from './BookCard/BookCard.jsx';


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
    <div style={{width: '100%'}}>
        <div style={{zIndex: '9', position: 'fixed', top: '20%', left: '0', right: '0', backgroundColor: '#F8F3F3',  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
          <Input style={{ width: '300px', marginBottom: '1rem'}} type="text" name="filter" onChange={handleChange} />
          <StyledLoginButton onClick={refreshBookList}>Refresh</StyledLoginButton>
        </div>
      <div style={{width: '100%', marginTop: '7rem'}}>
        <div>
          {bookList
            .filter(book => searchWords(book.title.toLowerCase(), filterWord))
            .map((data, index) => (
              <BookCard data={data}  key={index} />
              
              ))
          } 
        </div>
      </div>
    </div>
  )
}

export default FilterBar