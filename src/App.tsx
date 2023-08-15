import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useBookSearch } from './useBookSearch';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isError, books, hasMore } = useBookSearch(
    query,
    pageNumber
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className='App'>
      <input type='text' value={query} onChange={handleSearch}></input>
    </div>
  );
}

export default App;
