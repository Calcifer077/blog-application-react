import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button';
import FormLabel from '../ui/FormLabel';
import authService from '../services/apiAuthentication';
import { createUser, clearUser } from '../features/Users/userSlice';
import { login, logout } from '../features/Users/authSlice';

function LogIn() {
  // To make form elements controlled elements.
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // To dispatch actions of reducers
  const dispatch = useDispatch();

  // To navigate to a different page of our website.
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const res = await authService.login(data);

      if (String(res.message) === 'success') {
        // Reset user state
        dispatch(clearUser());
        dispatch(logout());

        // Log in new user.
        dispatch(login(res.token));

        const userData = {
          id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.email,
        };

        // Creating a new user.
        dispatch(createUser(userData));
        toast.success('Log In successfull');

        // Go to homepage after some time.
        // You can't use a 'useEffect' as 'useEffect' needs to be a top level code.
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error('Error during login');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || 'Error during login');
    }
  }

  function onError(err) {
    console.error(err);
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="mb-6 text-center text-2xl font-bold">Welcome back!</h1>
      <form
        className="flex w-96 flex-col gap-4 rounded-lg border-2 bg-white p-6 shadow-md"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div>
          <FormLabel label="Enter your email" error={errors.email}>
            <input
              type="text"
              placeholder="Your email"
              id="email"
              className="w-full rounded-lg border-2 p-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('email', {
                required: 'Email is required',
              })}
            />
          </FormLabel>
        </div>
        <div>
          <FormLabel label="Enter Password" error={errors.password}>
            <input
              type="password"
              placeholder="Your password"
              id="password"
              className="w-full rounded-lg border-2 p-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('password', {
                required: 'Please enter your password',
              })}
            />
          </FormLabel>
        </div>
        {/* <button
          type="submit"
          className="w-full cursor-pointer rounded-lg border-2 bg-blue-400 p-3 text-white transition-all hover:bg-blue-700 hover:font-bold focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Log In
        </button> */}
        <Button whom="submit" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
