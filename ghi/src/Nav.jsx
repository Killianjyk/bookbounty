import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutMutation } from "./app/authApiSlice";
import DiscoverChunkDropdownNav from "./DiscoverChunkDropdownNav";
import DiscoverChunkNav from "./DiscoverChunkNav";
import LoginSignUpNav from "./LoginSignUpNav";
import UserDropdownDropdown from "./UserDropdownDropdown";
import UserDropdown from "./UserDropdown";
import ThemeSwitchButton from "./ThemeSwitchButton";

const Nav = () => {
  const { data: user } = useGetUserQuery();

  return (
    <>
      <div className="navbar bg-orange-200 dark:bg-slate-800 txt">
        <div className="navbar-start lg:flex">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-orange-200 dark:bg-slate-800 rounded-box w-52"
            >
              <DiscoverChunkDropdownNav />
              {!user && <LoginSignUpNav />}
              {user && <UserDropdown />}
            </ul>
          </div>
          <NavLink
            to={"/"}
            className="mr-8 btn btn-ghost normal-case text-xl dark:hover:bg-slate-700"
          >
            <img
              className="h-8 mr-2"
              src="/Marcus-Roberto-Google-Play-Google-Play-Books.512.png"
              alt="logo"
            />
            BookBounty
          </NavLink>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <DiscoverChunkNav />
          </ul>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {!user && <LoginSignUpNav />}
              {user && <UserDropdownDropdown />}
            </ul>
          </div>
          <ThemeSwitchButton />
        </div>
      </div>
    </>
  );
};
export default Nav;
