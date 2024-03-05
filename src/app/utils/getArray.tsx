import axios from "axios";
import { useCallback } from "react";

export const fetchCityArray = useCallback(async () => {
    try {
        const data = {
            Page: 0,
            Count: 4000,
            Lang: 'RUS'
        }
        const response = await axios.post('/api/v1/cities/get', data);
        const dat = response.data;
        return dat
    } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}, []);