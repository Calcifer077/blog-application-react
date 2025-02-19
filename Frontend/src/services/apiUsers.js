import axios from "axios";
import API_URL from "./apiConfig";

const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/v1/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === "success") {
      console.log("Login successful");
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/api/v1/users/:${id}`);

    if (res.data.status === "success") {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/api/v1/users/:${id}`);

    if (res.data.status === "success") {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export default {
  getUsers,
  getUserById,
  deleteUser,
};
