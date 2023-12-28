import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCityArrival = createAsyncThunk(
    'cityArrival/fetch',
    async (cityArrival: string) => {
      try {
        const data = {
          name: cityArrival,
          lang: 'RUS'
        }
        const response = await axios.post('/api/v1/cities/find', data);
        return response.data;
      } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
        throw error;
      }
    }
  );