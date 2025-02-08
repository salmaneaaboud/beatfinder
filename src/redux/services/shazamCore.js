import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from "./../../config";

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/user' }),
    getSongByGenre: builder.query({ query: () => `/beats` }),
    getUserLikes: builder.query({ query: (token) => ({
      url: `/user-likes`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })}),
    getSongByProducer: builder.query({ query: (producerid) => `/producers/${producerid}/beats` }),
    getProducerDetails: builder.query({ query: (producerid) => `/producers/${producerid}` }),
    getPurchasedBeats: builder.query({ query: () => `/client/purchased-beats` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongByGenreQuery,
  useGetUserLikesQuery,
  useGetSongByProducerQuery,
  useGetProducerDetailsQuery,
  useGetPurchasedBeatsQuery
} = shazamCoreApi;
