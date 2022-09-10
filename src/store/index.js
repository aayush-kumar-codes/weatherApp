import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./weatherApp";

export default configureStore({
  reducer: { counter: counterReducer },
});
