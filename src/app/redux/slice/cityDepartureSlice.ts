import { ICityDataProps } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ICityDataProps = {
  Result: [
    {
      Id: 0,
      Name: "",
      Coordinates: {
        Latitude: "",
        Longitude: "",
      },
    }
  ],
  Error: null,
};

const cityDepartureSlice = createSlice({
  name: 'cityDeparture',
  initialState,
  reducers: {
    setCityDepartureData: (state, action) => {
      state.Result = action.payload;
      state.Error = null;
    },
    setCityDepartureError: (state, action) => {
      state.Error = action.payload;
    },
  },
});

export const { setCityDepartureData, setCityDepartureError } = cityDepartureSlice.actions;

export default cityDepartureSlice.reducer;
