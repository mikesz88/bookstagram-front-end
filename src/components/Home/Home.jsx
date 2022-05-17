import React from 'react'
import FilterBar from './FilterBar/FilterBar'
import HomeNavbar from './HomeNavbar/HomeNavbar'

const Home = () => {
  
  return (
    <>
      <HomeNavbar />
      <FilterBar />
    </>
  )
}

/* 
1. filterbar gets a title that will be submitted in the bookService
2. the bookFeed will show the books. Shows all unless filtered title from bookService is not empty with useEffect.
*/

export default Home