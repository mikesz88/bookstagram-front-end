import React,{ useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../App.js';


const FilterBar = () => {
  const { bookService } = useContext(UserContext);
  const [bookList, setBookList] = useState(bookService.bookList);
  const [filterWord, setFilterWord] = useState('');

  const handleChange = ({ target: { value }}) => setFilterWord(value);

  useEffect(() => {
    console.log('test');
    bookService.getBookList()
    .then(() => setBookList(bookService.bookList))
    .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    console.log('test1');
    setBookList(bookService.bookList);
  }, [bookService.bookList.length])

  const searchWords = (title, searchWord) => {
    const titleArray = title.split(' ');
    return titleArray.some(word => word.includes(searchWord.toLowerCase())) ? true : false;
  }

  return (
    <>
      <input type="text" name="filter" onChange={handleChange} />
      <div>
        {bookList
          .filter(book => searchWords(book.title.toLowerCase(), filterWord))
          .map((data, index) => (
            <div key={index}>
              <div>{data.title}</div>
              <img src={data.photoUrl} style={{width: 300, height: 'auto'}} alt="" />
              <div>{data.user}</div>
            </div>
          ))
        } 
      </div>
    </>
  )
}

export default FilterBar