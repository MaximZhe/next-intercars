import { Middleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import widthWindowReduser from "../slice/widthWindowSlice";
import languageReduser from "../slice/languageSlice";
import stateMobileMenuReduser from "../slice/menuMobileStateSlice";
import sliderItemsReduser from "../slice/sliderItemsSlice";
import singleItemSalesReduser from "../slice/singleItemSalesSlice";
import dataRouteReduser from "../slice/getRoutesSlice";
import dataOrderFormReduser from '../slice/dataOrderFormUsers';
import storegeRouteReduser from '../slice/storegeDataRoute';
import cityDepartureReduser from '../slice/cityDepartureSlice';
import cityArrivalReduser from '../slice/cityArrivalSlice';
import dataRoutesReduser from '../slice/getRoutesSearchSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { cityArrivalApi, cityDepartureApi } from "../api/getCityRoutes";
import SearchRoutesApi from "../api/getRoutesSearch";


const persistConfig = {
  key: "root",
  storage,
};
const rootReduсer = combineReducers({
  widthWindowReduser,
  languageReduser,
  stateMobileMenuReduser,
  sliderItemsReduser,
  singleItemSalesReduser,
  dataRouteReduser,
  storegeRouteReduser,
  cityDepartureReduser,
  dataOrderFormReduser,
  cityDepartureApi: cityDepartureApi.reducer, 
  cityArrivalReduser,
  cityArrivalApi: cityArrivalApi.reducer, 
  dataRoutesReduser,
  SearchRoutesApi: SearchRoutesApi.reducer, 
});
const persistedReducer = persistReducer(persistConfig, rootReduсer);

export const setupStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(cityDepartureApi.middleware as Middleware,cityArrivalApi.middleware as Middleware,SearchRoutesApi.middleware as Middleware,),
  });
   
  setupListeners(store.dispatch);

  return store;
 
   
};
export const persist = persistStore(setupStore());
export type RootSate = ReturnType<typeof persistedReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];