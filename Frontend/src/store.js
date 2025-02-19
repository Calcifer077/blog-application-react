import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/Users/authSlice';
import userReducer from './features/Users/userSlice';
import blogReducer from './features/Blogs/blogSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    blog: blogReducer,
  },
});

export default store;
