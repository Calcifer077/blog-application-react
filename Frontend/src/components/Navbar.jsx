import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import User from "../features/Users/User";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [isUser, setIsUser] = useState();

  useEffect(
    function () {
      if (user.id !== "") {
        setIsUser(user.id);
      } else {
        setIsUser(" ");
      }
    },
    [user]
  );

  const [buttonText, setButtonText] = useState("Sign In");

  useEffect(
    function () {
      if (location.pathname === "/signup") {
        setButtonText("Login");
      } else if (location.pathname === "/login") {
        setButtonText("Sign In");
      }
    },
    [location.pathname]
  );
  return (
    <div className="m-4 flex justify-between pt-2">
      <img src="icon.png" className="h-20 w-20 items-center rounded-4xl" />
      <div>
        <div className="mx-auto ml-12 flex justify-between gap-6 uppercase">
          <button
            className="cursor-pointer rounded-xl bg-blue-200 p-4 duration-200 hover:bg-blue-400"
            onClick={() => navigate("/")}
          >
            HomePage
          </button>
          <button
            className="cursor-pointer rounded-xl bg-blue-200 p-4 duration-200 hover:bg-blue-400"
            onClick={() => navigate("/createNewBlog")}
          >
            Create new Blog
          </button>
          <button
            className="cursor-pointer rounded-xl bg-blue-200 p-4 duration-200 hover:bg-blue-400"
            onClick={() => navigate("/search")}
          >
            Search
          </button>
        </div>
      </div>
      {isUser !== " " ? (
        <User />
      ) : (
        <Button
          to={`${buttonText === "Login" ? "/login" : "/signup"}`}
          whom="navbar"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default Navbar;
