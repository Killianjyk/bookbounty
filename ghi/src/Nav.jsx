import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutMutation } from "./app/apiSlice";
import { useEffect, useState } from "react";


const Nav = () => {
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    const [logout] = useLogoutMutation();

    const [theme, setTheme] = useState('light');

  // if local storage is empty save theme as light
  useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    // select html elem
    const html = document.querySelector('html');
    //add or remove class dark in html elem according to theme in localstorage.
    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
      setTheme('dark');
    } else {
      html.classList.remove('dark');
      setTheme('light');
    }
  }, [theme]);

  // handle switch theme
  const handleThemeSwitch = () => {
    if (localStorage.getItem('theme') === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');

      var image = document.getElementById("theme-toggle-icon");
      // Remove the src attribute
      image.removeAttribute("src");
      // Add a new src attribute
      image.setAttribute("src", "/light-mode-icon-orange.png");

    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');

      var image = document.getElementById("theme-toggle-icon");
      // Remove the src attribute
      image.removeAttribute("src");
      // Add a new src attribute
      image.setAttribute("src", "/dark-mode-icon.png");

    }
  };

    return (
      <>
  {/* <div className="navbar bg-orange-200 dark:bg-slate-800 txt">
  <div className="flex-1">
    <NavLink to={"/"} className="btn btn-ghost normal-case text-xl dark:hover:bg-slate-700">BookBounty</NavLink>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {!user &&  <><li><NavLink className="dark:hover:bg-slate-700" to={"/login/"} >Login</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700" to={"/signup/"} >Sign Up</NavLink></li></>}
      <li><NavLink className="dark:hover:bg-slate-700" to={"/discover/"} >Discover Books</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700" to={"/users/search/"} >Discover Users</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700" to={"/random/"} >Random Book</NavLink></li>
      {user && <><li><NavLink className="dark:hover:bg-slate-700" to={"/books/favorites/" + user.username} >Favorites</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700" to={"/books/previous/" + user.username} >Previously Read</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700" to={"/books/next/" + user.username} >Read Next</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700" to={"/users/"} >User Home</NavLink></li></>}
      {user && <><li><NavLink onClick={() =>{logout(); navigate("/");}} className="bg-orange-200 dark:bg-slate-800 hover:bg-red-400 dark:hover:bg-red-800 txt">Logout</NavLink></li></>}
    </ul>
  <button onClick={handleThemeSwitch} id="theme-toggle" type="button" className="rounded-full bg-orange-200 mr-2">
      <img className="w-10 h-10" id="theme-toggle-icon" src="/light-mode-icon.png"></img>
  </button>
  </div>
</div> */}


<div className="navbar bg-orange-200 dark:bg-slate-800 txt">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-orange-200 dark:bg-slate-800 rounded-box w-52">
        {!user &&  <><li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/login/"} >Login</NavLink></li>
        <li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/signup/"} >Sign Up</NavLink></li></>}
        <li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/discover/"} >Discover Books</NavLink></li>
        <li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/users/search/"} >Discover Users</NavLink></li>
        <li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/random/"} >Random Book</NavLink></li>
        {user && <><li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/books/favorites/" + user.username} >Favorites</NavLink></li>
        <li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/books/previous/" + user.username} >Previously Read</NavLink></li>
        <li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/books/next/" + user.username} >Read Next</NavLink></li>
        <li><NavLink className="dark:hover:text-gray-300 dark:hover:text-gray-700" to={"/users/"} >User Home</NavLink></li></>}
        {user && <><li><NavLink onClick={async () =>{await logout(); navigate("/");}} className="bg-orange-200 dark:bg-slate-800 hover:bg-red-400 dark:hover:bg-red-800 txt">Logout</NavLink></li></>}
      </ul>
    </div>
    <NavLink to={"/"} className="btn btn-ghost normal-case text-xl dark:hover:bg-slate-700">BookBounty</NavLink>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {!user &&  <><li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/login/"} >Login</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/signup/"} >Sign Up</NavLink></li></>}
      <li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/discover/"} >Discover Books</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/users/search/"} >Discover Users</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/random/"} >Random Book</NavLink></li>
      {user && <><li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/books/favorites/" + user.username} >Favorites</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/books/previous/" + user.username} >Previously Read</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/books/next/" + user.username} >Read Next</NavLink></li>
      <li><NavLink className="dark:hover:bg-slate-700 dark:hover:text-gray-300" to={"/users/"} >User Home</NavLink></li></>}
      {user && <><li><NavLink onClick={async () =>{await logout(); navigate("/");}} className="bg-orange-200 dark:bg-slate-800 hover:bg-red-400 dark:hover:bg-red-800 txt">Logout</NavLink></li></>}
    </ul>
  </div>
  <div className="navbar-end">
    <button onClick={handleThemeSwitch} id="theme-toggle" type="button" className="mr-2">
      <img className="h-10" id="theme-toggle-icon" src="/light-mode-icon-orange.png"></img>
    </button>
  </div>
</div>


</>
    );
};
export default Nav;
