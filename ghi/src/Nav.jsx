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
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

    return (
      <>
  <div className="navbar bg-amber-100 dark:bg-slate-800 txt">
  <div className="flex-1">
    <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">BookBounty</NavLink>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {!user &&  <><li><NavLink to={"/login/"} >Login</NavLink></li>
      <li><NavLink to={"/signup/"} >Sign Up</NavLink></li></>}
      <li><NavLink to={"/discover/"} >Discover Books</NavLink></li>
      <li><NavLink to={"/users/search/"} >Discover Users</NavLink></li>
      <li><NavLink to={"/random/"} >Random Book</NavLink></li>
      {user && <><li><NavLink to={"/books/favorites/" + user.username} >Favorites</NavLink></li>
      <li><NavLink to={"/books/previous/" + user.username} >Previously Read</NavLink></li>
      <li><NavLink to={"/books/next/" + user.username} >Read Next</NavLink></li>
      <li><NavLink to={"/users/"} >User Home</NavLink></li></>}
    </ul>
    {user && <button onClick={() =>{logout(); navigate("/");}} className={"btn-danger"}>Logout</button>}
          <button onClick={handleThemeSwitch} id="theme-toggle" type="button" className="bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg text-sm p-2.5">
    <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
    <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
</button>
  </div>
</div>


      {/* <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">BookBounty</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navigation">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-wrap">
              {!user && <li className="nav-item">
                <NavLink to={"/login/"} className={"nav-link"}>Login</NavLink>
              </li>}
              <li>
                <NavLink to="/discover/" className="nav-link">Discover Books</NavLink>
              </li>
              <li>
                <NavLink to={"/users/search/"} className="nav-link">Discover Users</NavLink>
              </li>
              {user && <><li className="nav-item">
                <NavLink to={"/books/favorites/"} className={"nav-link"}>Favorites</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/books/previous/"} className={"nav-link"}>Previous</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/books/next/"} className={"nav-link"}>Next</NavLink>
              </li></>}
              {user && <>
              <li className="nav-item">
                <NavLink to={"/users/"} className={"nav-link"}>User Home</NavLink>
              </li>
              </>}
            </ul>
            {user && <button onClick={() =>{logout(); navigate("/");}} className={"btn-danger"}>Logout</button>}
          </div>
        </div>
      </nav> */}




</>
    );
};
export default Nav;
