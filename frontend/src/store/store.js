import { configureStore } from "@reduxjs/toolkit";
import fieldsReducer from "../reducers/fieldSlice";

const store = configureStore({
  reducer: {
    fields: fieldsReducer
  }
});

export default store;
