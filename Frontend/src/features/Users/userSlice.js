import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  id: '',
  blog: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,

  reducers: {
    createUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    updateName(state, action) {
      state.name = action.payload.name;
    },
    clearUser(state, action) {
      return initialState;
    },
    addBlog(state, action) {
      const blog = action.payload;
      state.blog[blog._id] = blog;
    },
    deleteBlog(state, action) {
      delete state.blog[action.payload];
    },
  },
});

export const { createUser, clearUser, updateName, addBlog, deleteBlog } =
  userSlice.actions;

export default userSlice.reducer;
