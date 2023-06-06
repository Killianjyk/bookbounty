import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="p4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{user.username}</h2>
          <div className="card-actions justify-end">
            <Link
              to={`/books/favorites/${user.username}`}
              className="btn btn-xs btn-secondary"
            >
              Favorites
            </Link>
            <Link
              to={`/books/previous/${user.username}`}
              className="btn btn-xs btn-neutral btn-primary"
            >
              Previously Read
            </Link>
            <Link
              to={`/books/next/${user.username}`}
              className="btn btn-xs btn-neutral btn-primary"
            >
              Read Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
