import { NavLink } from "react-router-dom";

const DiscoverChunkDropdownNav = () => {
  return (
    <>
      <li>
        <NavLink
          className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
          to={"/discover/"}
        >
          Discover Books
        </NavLink>
      </li>
      <li>
        <NavLink
          className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
          to={"/users/search/"}
        >
          Discover Users
        </NavLink>
      </li>
      <div className="border-b border-gray-500">
        <li>
          <NavLink
            className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
            to={"/random/"}
          >
            Random Book
          </NavLink>
        </li>
      </div>
    </>
  );
};
export default DiscoverChunkDropdownNav;
