import React, { useEffect } from 'react';
import axios, { Canceler } from 'axios';

export const useBookSearch = (query: string, pageNumber: number) => {
  useEffect(() => {
    let cancelToken: Canceler;
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (c = cancelToken)),
    })
      .then((res) => console.log(res.data))
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }, [query, pageNumber]);
};
