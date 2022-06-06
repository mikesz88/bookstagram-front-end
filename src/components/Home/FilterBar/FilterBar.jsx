/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import BookList from '../BookList/BookList';
import { StyledDivWrapper, StyledFilterContainer, StyledInput } from './styles';

const FilterBar = () => {
  const [filterWord, setFilterWord] = useState('');

  const handleChange = ({ target: { value } }) => setFilterWord(value);

  return (
    <StyledDivWrapper>
      <StyledFilterContainer>
        <StyledInput
          placeholder="Search Book"
          type="text"
          name="filter"
          onChange={handleChange}
        />
      </StyledFilterContainer>
      <BookList filteredWord={filterWord} />
    </StyledDivWrapper>
  );
};

export default FilterBar;
