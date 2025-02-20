import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { getToken } from '../features/Users/authSlice';

import blogService from '../services/apiBlogs';
import FormLabel from '../ui/FormLabel';
import Button from '../ui/Button';

function CreateNewBlog() {
  const { register, handleSubmit, formState, resetField } = useForm();
  const { errors } = formState;

  // To send token to backend
  const token = useSelector(getToken);

  const queryClient = useQueryClient();

  // Mutation
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (data) => blogService.createBlog({ ...data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      toast.success('Blog created Successfully!');
    },
    onError: (err) => {
      toast.error(
        err.message || 'An unexpected error occured. Please try again!',
      );
    },
  });

  function onSubmit(data) {
    mutate({ title: data.title, content: data.content });
    resetField('title');
    resetField('content');
  }

  function onError(err) {
    toast.error(err.message || 'Something went wrond. Please try again!');
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <form
        className="w-full space-y-6 rounded-lg bg-white p-8 shadow-md"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-700">
          Create New Blog
        </h2>

        <div>
          <FormLabel label={'Blog Title'} htmlFor="title" error={errors.title}>
            <input
              type="text"
              id="title"
              placeholder="Title of your Blog"
              className="w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:shadow-lg focus:ring-blue-500 focus:outline-none"
              disabled={isLoading}
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
              placeholder="Write your blog content here..."
              className="w-full resize-none rounded-lg border-2 border-gray-300 p-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:shadow-lg focus:ring-blue-500 focus:outline-none"
              disabled={isLoading}
              rows={6}
              {...register('content', { required: 'Content is required' })}
            />
          </FormLabel>
        </div>

        <div className="text-center">
          {/* <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-white transition-all duration-200 hover:bg-blue-700"
            disabled={isLoading}
          >
            Submit Blog
          </button> */}
          <Button whom="submit" type="submit" disabled={isLoading}>
            Submit Blog
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewBlog;
