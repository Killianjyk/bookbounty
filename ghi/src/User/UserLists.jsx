// UserLists.jsx

import { useSelector } from "react-redux";
import { useGetUserSearchQuery } from "../app/authApiSlice";
import UserCard from "./UserCard";

const UserLists = ({ name }) => {
  const searchField = useSelector((state) => state.searchField.userSearch);
  const { data: searchUsers, isLoading: searchLoad } = useGetUserSearchQuery(
    searchField,
    { skip: name !== "User Search" }
  );

  if (searchLoad) {
    return (
      <div className="mt-4 flex justify-center items-center">
        <div className="book">
          <div className="book__pg-shadow"></div>
          <div className="book__pg"></div>
          <div className="book__pg book__pg--2"></div>
          <div className="book__pg book__pg--3"></div>
          <div className="book__pg book__pg--4"></div>
          <div className="book__pg book__pg--5"></div>
        </div>
      </div>
    );
  }

  if (!searchUsers || searchUsers.length === 0) {
    return (
      <div className="flex justify-center items-center">
        No matching result found
      </div>
    );
  }

  return (
    <>
      {name === "User Search" && searchField && <h1 className="txt">{name}</h1>}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-center">
          {searchUsers.map((user) => (
            <div key={user.username}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserLists;
