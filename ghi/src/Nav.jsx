import { Link, NavLink } from "react-router-dom";
import { useGetUserQuery } from "./app/apiSlice";

const Nav = () => {
    const { data: user } = useGetUserQuery();
    console.log({user})
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">BookBounty</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user && <li className="nav-item">
                <NavLink to={'/login'} className={'nav-link'}>Login</NavLink>
              </li>}
              {user && <li className="nav-item">
                <NavLink to={'/logout'} className={'nav-link'}>Logout</NavLink>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    );
};
export default Nav;
