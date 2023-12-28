
import { ICityDataProps } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const cityDepartureApi = createApi({
  reducerPath: 'cityDepartureApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173/api/v1/' }),
  endpoints: (builder) => ({
    fetchCityDeparture: builder.mutation<ICityDataProps, string>({
      query: (cityDeparture) => ({
        url: '/cities/find',
        method: 'POST',
        body: {
          name: cityDeparture,
          lang: 'RUS',
        },
      }),
    }),
  }),
});
export const cityArrivalApi = createApi({
    reducerPath: 'cityArrivalApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173/api/v1/' }),
    endpoints: (builder) => ({
      fetchCityArrival: builder.mutation<ICityDataProps, string>({
        query: (cityArrival) => ({
          url: '/cities/find',
          method: 'POST',
          body: {
            name: cityArrival,
            lang: 'RUS',
          },
        }),
      }),
    }),
  });
export const { useFetchCityDepartureMutation } = cityDepartureApi;
export const { useFetchCityArrivalMutation } = cityArrivalApi;