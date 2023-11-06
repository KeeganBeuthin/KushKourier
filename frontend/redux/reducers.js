// reducers.js
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import productReducer from './productSlice'
const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer
});

export default rootReducer;
