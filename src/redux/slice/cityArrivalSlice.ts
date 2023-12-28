import { ICityDataProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

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

const cityArrivalSlice = createSlice({
  name: "cityArrival",
  initialState,
  reducers: {
    setCityArrivalData: (state, action) => {
      state.Result = action.payload;
      state.Error = null;
    },
    setCityArrivalError: (state, action) => {
      state.Error = action.payload;
    },
  },
});

export const { setCityArrivalData, setCityArrivalError } =
  cityArrivalSlice.actions;

export default cityArrivalSlice.reducer;
