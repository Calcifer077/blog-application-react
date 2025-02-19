import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from './userSlice';
import { logout } from './authSlice';
import Button from '../../ui/Button';

function User() {
  // To dispatch actions of reducers
  const dispatch = useDispatch();

  // To navigate to a different page of our website.
  const navigate = useNavigate();

  // Clear user details(logging user out).
  function onClick() {
    dispatch(clearUser());
    dispatch(logout());

    navigate('/');
  }

  return (
    <div className="flex items-center">
      <img
        src="icons8-user-24.png"
        className="absolute top-6 right-36 cursor-pointer rounded-full pt-4 transition-all duration-100 hover:top-8 hover:border-2 hover:border-blue-500 hover:p-1"
      />
      <Button whom="navbar" onClick={onClick}>
        Logout
      </Button>
    </div>
  );
}

export default User;
