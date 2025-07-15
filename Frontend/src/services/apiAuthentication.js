import axiosInstance from './apiConfig';

const login = async (data) => {
  try {
    const { email, password } = data;
    const res = await axiosInstance.post(`/api/v1/user/login`, {
      email,
      password,
    });

    if (String(res.data.message) === 'success') {
      return res.data;
    } else {
      throw new Error('An error occured while logging you in!');
    }
  } catch (err) {
    throw new Error('An error occured while logging you in!');
  }
};

const signup = async (data) => {
  try {
    const { name, email, password, passwordConfirm } = data;

    const res = await axiosInstance.post(`/api/v1/user/signup`, {
      name,
      email,
      password,
      passwordConfirm,
    });

    if (String(res.data.message) === 'success') {
      return res.data;
    } else {
      throw new Error('An error occured while signing you in!');
    }
  } catch (err) {
    throw new Error('An error occured while signing you in!');
  }
};

const logout = async () => {
  try {
    const res = await axiosInstance.get(`/api/v1/user/logout`);

    if (res.data.status === 'success') {
      console.log('success');
    }
  } catch (err) {
    console.log(err);
  }
};

export default { login, signup, logout };
