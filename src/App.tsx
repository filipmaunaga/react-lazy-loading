import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import { useBookSearch } from './useBookSearch';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isError, books, hasMore } = useBookSearch(
    query,
    pageNumber
  );

  const observer = useRef<IntersectionObserver>();
  const lastItemInTheList = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current?.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className='App'>
      <input type='text' value={query} onChange={handleSearch}></input>
      {books.map((book, index) => {
        // check if it's the last element in the list
        if (books.length === index + 1)
          return (
            <div ref={lastItemInTheList} key={book}>
              {book}
            </div>
          );
        else return <div key={book}>{book}</div>;
      })}
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
    </div>
  );
}

export default App;
