

import { IFetchDataRoutes } from '@/app/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const SearchRoutesApi = createApi({
  reducerPath: 'SearchRoutesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173/api/v1/' }),
  endpoints: (builder) => ({
    searchRoutes: builder.mutation< any, IFetchDataRoutes>({
      query: (data) => ({
        url: '/routes/search',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSearchRoutesMutation } = SearchRoutesApi;

export default SearchRoutesApi;