import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: {}, // Keeping blogs as an object (key-value pair)
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,

  reducers: {
    addBlog(state, action) {
      const blog = action.payload; // { _id, title, content }
      state.blogs[blog._id] = blog; // Store blog using its ID as a key
    },
    deleteBlog(state, action) {
      delete state.blogs[action.payload]; // Remove blog by ID
    },
  },
});

export const { addBlog, deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;
