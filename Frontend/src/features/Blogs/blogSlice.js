import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [{}], // Keeping blogs as an object (key-value pair)
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,

  reducers: {
    addBlog(state, action) {
      // const blog = action.payload; // { _id, title, content }
      // state.blogs[blog._id] = blog; // Store blog using its ID as a key

      state.blogs.push(action.payload);
    },
    // deleteBlog(state, action) {
    //   delete state.blogs[action.payload]; // Remove blog by ID
    // },
    clearBlog(state, action) {
      state.blogs.length = 0;
    },
  },
});

export const { addBlog, clearBlog } = blogSlice.actions;

export default blogSlice.reducer;

export const getBlogs = (state) => state.blog.blogs;
