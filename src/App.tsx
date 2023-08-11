import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useBookSearch } from './useBookSearch';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useBookSearch(query, pageNumber);

  return (
    <div className='App'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </div>
  );
}

export default App;
