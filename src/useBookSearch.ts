import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const useBookSearch = (query: string, pageNumber: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const controller = new AbortController();

    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      signal: controller.signal,
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...res.data.docs.map((book: { title: any }) => book.title),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setIsError(true);
      });
    return () => controller.abort();
  }, [query, pageNumber]);

  return { isLoading, isError, books, hasMore };
};
