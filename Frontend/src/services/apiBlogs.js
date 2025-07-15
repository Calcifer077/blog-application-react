import axiosInstance from './apiConfig';

const getBlogs = async () => {
  try {
    const res = await axiosInstance.get(`/api/v1/blogs`);

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
    if (!token) {
      throw new Error('You are not logged in. Please log in.');
    }

    const res = await axiosInstance.delete(`/api/v1/blogs/:${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (String(res.data.status) === 'success') {
      return res.data;
    }
  } catch (err) {
    // All errors thrown above will be caught here.
    throw err;
  }
};

const searchBlog = async (searchQuery, type) => {
  try {
    if (!searchQuery || !type) {
      return [];
    }

    searchQuery = searchQuery.replace(' ', '_');

    // Search based on title
    if (type === 'title') {
      const res = await axiosInstance.get(
        `/api/v1/blogs/search?t=${searchQuery}`,
      );

      if (String(res.data.status) === 'success') {
        return res.data.data;
      }
    }

    // Search based on content
    if (type === 'content') {
      const res = await axiosInstance.get(
        `/api/v1/blogs/search?c=${searchQuery}`,
      );

      if (String(res.data.status) === 'success') {
        return res.data.data;
      }
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default {
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
  createBlog,
  searchBlog,
};
