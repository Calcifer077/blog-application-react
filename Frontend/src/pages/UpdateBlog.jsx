import { useSelector } from 'react-redux';
import { getToken } from '../features/Users/authSlice';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import blogService from '../services/apiBlogs';
import FormLabel from '../ui/FormLabel';
import Button from '../ui/Button';

function CreateNewBlog() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // To navigate around our website
  const navigate = useNavigate();

  // 'useParams' is used to get accesss to our dynamic route. It gives parameters from our routes
  // It gives value as a object in a key-value pair.
  let params = useParams();
  const id = params.id;

  // To get data from 'redux'. 'getToken' is already defined there.
  const token = useSelector(getToken);

  // Mutation

  // To get access to react-query
  const queryClient = useQueryClient();

  // First will get data then update it.
  // Getting data
  const { mutate: loadBlogData, isLoading: isFetchingData } = useMutation({
    mutationFn: () => blogService.getBlogById({ id }),
    onSuccess: (blog) => {
      setTitle(blog.title);
      setContent(blog.content);
    },
    onError: (err) => {
      toast.error(
        err.message || 'An unexpected error occured. Please try again',
      );
      console.err(err);
    },
  });

  const { mutate: updateBlog, isLoading: isUpdating } = useMutation({
    mutationFn: ({ blogData, id, token }) =>
      blogService.updateBlogById(blogData, id, token),
    onSuccess: () => {
      toast.success('Blog updated successfully');

      // Refetch 'blogs' as we have updated it.
      // It makes 'blogs' as stale which forces 'react-query' to fetch it again.
      queryClient.invalidateQueries(['blogs']);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    onError: (err) => {
      toast.error(
        err.message || 'An unexpected error occured. Please try again!',
      );

      // console.log(err);
    },
  });

  const { mutate: deleteBlog, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, token }) => blogService.deleteBlogById(id, token),
    onSuccess: () => {
      toast.success('Blog deleted successfully');

      // Refetch 'blogs' as we have updated it.
      queryClient.invalidateQueries(['blogs']);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    onError: (err) => {
      // console.log(err);
      toast.error(
        err.message || 'An unexpected error occured. Please try again!',
      );
    },
  });

  useEffect(function () {
    loadBlogData();
  }, []);

  function onSubmit(data) {
    // console.log(id, token, data);
    updateBlog({
      blogData: {
        title: data.title,
        content: data.content,
      },
      id: id,
      token: token,
    });
  }

  function onError(err) {
    // console.log(err);
    toast.error(err.message || 'Something went wrong. Please try again!');
  }

  function handleClick() {
    // console.log(token, id);
    // console.log('Button clicked');
    deleteBlog({ id, token });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <form
        className="w-full space-y-6 rounded-lg bg-white p-8 shadow-md"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-700">
          Update your Blog
        </h2>

        <div>
          <FormLabel label={'Blog Title'} htmlFor="title" error={errors.title}>
            <input
              type="text"
              id="title"
              className="w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:shadow-lg focus:ring-blue-500 focus:outline-none"
              defaultValue={title}
              disabled={isFetchingData}
              {...register('title', { required: 'Title is required!' })}
            />
          </FormLabel>
        </div>

        <div>
          <FormLabel
            label="Blog Content"
            htmlFor="content"
            error={errors.content}
          >
            <textarea
              id="content"
              defaultValue={content}
              className="w-full resize-none rounded-lg border-2 border-gray-300 p-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:shadow-lg focus:ring-blue-500 focus:outline-none"
              rows={6}
              disabled={isFetchingData}
              {...register('content', { required: 'Content is required' })}
            />
          </FormLabel>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            whom="submit"
            type="submit"
            disabled={isFetchingData || isUpdating || isDeleting}
          >
            Update Blog
          </Button>
          <Button
            whom="submit"
            onClick={handleClick}
            disabled={isFetchingData || isUpdating || isDeleting}
          >
            Delete Blog
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewBlog;
