import { Link } from "react-router-dom";

function Button({ children, to, whom, type, onClick }) {
  const base =
    "bg-blue-500 p-4 rounded-xl cursor-pointer hover:bg-blue-200 hover:font-bold duration-200 text-center";

  const styles = {
    navbar: base + " w-30 h-15",
    form:
      base +
      " w-full hover:bg-blue-700 hover:font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all",
    submit:
      base +
      " w-full hover:bg-blue-700 hover:font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all",
  };

  // Handle click event if onClick is provided
  // const handleClick = (
  //   event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  // ) => {
  //   // To prevent form auto submission
  //   if (onClick) {
  //     event.preventDefault();
  //     // Calling onClick for the event that have happend above
  //     onClick(event);
  //   }
  // };

  if (to) {
    return (
      <Link to={to} className={styles[whom]} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles[whom]}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
