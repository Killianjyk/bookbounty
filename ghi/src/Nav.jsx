import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutMutation } from "./app/apiSlice";

const Nav = () => {
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    const [logout] = useLogoutMutation();
    
    return (
      <nav className="navbar navbar-expand-lg">
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
      </nav>
    );
};
export default Nav;
