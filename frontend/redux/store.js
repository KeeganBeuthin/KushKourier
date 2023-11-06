import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import productReducer from './productSlice';

const store = configureStore({
    reducer: rootReducer,
});

export default store;
