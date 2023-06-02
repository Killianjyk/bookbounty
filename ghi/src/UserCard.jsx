// import { Link } from "react-router-dom"


// const UserCard = ({ user }) => {
//     return (<>
//         <div className="card mb-3 txt">
//             <div className="card-title">{user.username}</div>
//             <Link to={`/books/favorites/${user.username}/`}>Favorites</Link>
//             <Link to={`/books/previous/${user.username}/`}>Previously Read</Link>
//             <Link to={`/books/next/${user.username}/`}>Read Next</Link>
//         </div>
//     </>);
// }

// export default UserCard;


import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="card mb-3 txt">
      <div className="card-title cursor-pointer ml-8" onClick={toggleDropdown} style={{ fontSize: '16px', fontWeight: 'bold', color:'blue' }}>

        {user.username}
      </div>
      <div
        className="p-1 max-w-lg"
        style={{ display: dropdownOpen ? "block" : "none" }}
      >
        <ul className="ml-10 space-y-1">
          <li>
            <div className="bg-white">
              <Link to={`/books/favorites/${user.username}/`}>Favorites</Link>
            </div>
          </li>
          <li>
            <div className="bg-white">
              <Link to={`/books/previous/${user.username}/`}>
                Previously Read
              </Link>
            </div>
          </li>
          <li>
            <div className="bg-white">
              <Link to={`/books/next/${user.username}/`}>Read Next</Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
