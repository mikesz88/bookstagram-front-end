import React from 'react'
import FilterBar from './FilterBar/FilterBar'
import TopMenu from './TopMenu/TopMenu'

const Home = () => {
  
  return (
    <div style={{ backgroundColor: '#F8F3F3'}}>
      <TopMenu />
      <div style={{ display: 'flex', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '15px', paddingRight: '15px' }}>
        <FilterBar />
      </div>
    </div>
  )
}

/* 
1. filterbar gets a title that will be submitted in the bookService
2. the bookFeed will show the books. Shows all unless filtered title from bookService is not empty with useEffect.
*/

export default Home