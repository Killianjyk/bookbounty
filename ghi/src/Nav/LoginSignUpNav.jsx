import { NavLink } from "react-router-dom";

const LoginSignUpNav = () => {
  return (
    <>
      <li>
        <NavLink
          className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
          to={"/login/"}
        >
          Login
        </NavLink>
      </li>
      <li>
        <NavLink
          className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
          to={"/signup/"}
        >
          Sign Up
        </NavLink>
      </li>
    </>
  );
};
export default LoginSignUpNav;
