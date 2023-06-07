import { useGetUserQuery } from "./app/authApiSlice";
import { useParams } from "react-router-dom";
import BookLists from "./BookLists";

const UserBookLists = ({ name }) => {
  var { username } = useParams();
  const { data: user } = useGetUserQuery();
  const getCorrectUser = () => {
    if (username === undefined) {
      return user.username;
    }
    return username;
  };
  return <BookLists name={name} username={getCorrectUser()} />;
};

export default UserBookLists;
