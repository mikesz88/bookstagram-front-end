/* eslint-disable import/no-cycle */
import React from 'react';
import FilterBar from './FilterBar/FilterBar';
import { StyledBackgroundContainer, StyledFilterContainer } from './style';
import TopMenu from './TopMenu/TopMenu';

const Home = () => (
  <StyledBackgroundContainer>
    <TopMenu />
    <StyledFilterContainer>
      <FilterBar />
    </StyledFilterContainer>
  </StyledBackgroundContainer>
);

export default Home;
