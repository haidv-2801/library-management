import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import blogReducer from './slices/BlogSlice';
import contactReducer from './slices/ContactSlice';

const rootReducer = {
  app: appReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
