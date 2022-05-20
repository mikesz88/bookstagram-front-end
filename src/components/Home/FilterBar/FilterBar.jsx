import { Button } from 'antd';
import React,{ useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../App.js';
import BookCard from './BookCard/BookCard.jsx';


const FilterBar = () => {
  const { authService, bookService } = useContext(UserContext);
  const [bookList, setBookList] = useState(bookService.bookList);
  const [filterWord, setFilterWord] = useState('');

  const handleChange = ({ target: { value }}) => setFilterWord(value);

  const refreshBookList = () => setBookList(bookService.bookList);

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
    <>
      <input type="text" name="filter" onChange={handleChange} />
      <Button onClick={refreshBookList}>Refresh</Button>
      {bookList
        .filter(book => searchWords(book.title.toLowerCase(), filterWord))
        .map((data, index) => (
          <BookCard data={data}  key={index} />
        ))
      } 
    </>
  )
}

export default FilterBar