import axiosInstance from './apiConfig';

const getBlogs = async () => {
  try {
    const res = await axiosInstance.get(`/api/v1/blogs`);

    console.log(res);
    if (String(res.data.status) === 'success') {
      return res.data.data.blogs;
    }

    throw new Error('Unexpected API response');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getBlogById = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`/api/v1/blogs/:${id}`);

    console.log(res.data.blog);
    if (res.data.status === 'success') {
      return res.data.blog;
    }
  } catch (err) {
    throw err;
  }
};

const createBlog = async ({ title, content, token }) => {
  try {
    if (token === null) {
      throw new Error('You are not logged in. Please log in.');
    }

    const res = await axiosInstance.post(
      `/api/v1/blogs/`,
      {
        title,
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (String(res.data.status) === 'success') {
      return res;
    } else {
      throw new Error('Something went wrong while creating your blog');
    }
  } catch (err) {
    throw err;
  }
};

const updateBlogById = async (data, id, token) => {
  try {
    if (!token) {
      throw new Error('You are not logged in. Please log in.');
    }

    const { title, content } = data;
    const res = await axiosInstance.patch(
      `/api/v1/blogs/:${id}`,
      {
        title,
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (res.data.status === 'success') {
      return res;
    } else {
      throw new Error('Something went wrong while updating blog!');
    }
  } catch (err) {
    // All errors thrown above will be caught here.
    throw err;
  }
};

const deleteBlogById = async (id, token) => {
  try {
    console.log(token);
    if (!token) {
      throw new Error('You are not logged in. Please log in.');
    }

    const res = await axiosInstance.delete(`/api/v1/blogs/:${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(res.data);
    if (String(res.data.status) === 'success') {
      return res.data;
    }
  } catch (err) {
    // All errors thrown above will be caught here.
    throw err;
  }
};

export default {
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
  createBlog,
};
