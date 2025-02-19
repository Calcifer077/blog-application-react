import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import Button from '../ui/Button';
import FormLabel from '../ui/FormLabel';
import authService from '../services/apiAuthentication';
import { createUser, clearUser } from '../features/Users/userSlice';
import { login, logout } from '../features/Users/authSlice';

function SignUp() {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;

  const dispatch = useDispatch();

  // To watch password so that we apply validator on it.
  const password = watch('password');

  async function onSubmit(data) {
    try {
      const res = await authService.signup(data);

      if (String(res.message) === 'success') {
        dispatch(clearUser());
        dispatch(logout());
        dispatch(login(res.token));

        const userData = {
          id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.user.email,
        };

        dispatch(createUser(userData));

        toast.success('Sign up successfull');
      } else {
        toast.error('Error during signup');
      }
    } catch (err) {
      toast.error(err.message || 'Error during signup');
      console.error(err);
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="mb-6 text-center text-2xl font-bold">Register here!</h1>
      <form
        className="flex w-96 flex-col gap-4 rounded-lg border-2 bg-white p-6 shadow-md"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="min-h-[90px]">
          <FormLabel error={errors.name} label={'Enter your name'}>
            <input
              type="text"
              placeholder="Your name"
              id="name"
              className="w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('name', { required: 'Name is required' })}
            />
          </FormLabel>
        </div>
        <div className="min-h-[90px]">
          <FormLabel error={errors.email} label={'Enter your email'}>
            <input
              type="text"
              placeholder="Your email"
              id="email"
              className="w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('email', {
                required: 'Email is required',
              })}
            />
          </FormLabel>
        </div>
        <div className="min-h-[90px]">
          <FormLabel error={errors.password} label="Enter Password">
            <input
              type="password"
              placeholder="Your password"
              id="password"
              className="w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be atleast 8 characters',
                },
              })}
            />
          </FormLabel>
        </div>
        <div className="min-h-[90px]">
          <FormLabel
            error={errors.passwordConfirm}
            label="Confirm your password"
          >
            <input
              type="password"
              placeholder="Confirm your password"
              id="passwordConfirm"
              className="w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              // Below we have used a validator.
              // 'value' is the value of the current field and 'password' is above password which we have 'watched' using 'watch' provided by react-hook-form.
              {...register('passwordConfirm', {
                required: 'Please enter your password again',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
          </FormLabel>
        </div>

        <Button whom="submit" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
