import { useSelector } from "react-redux";
import { useGetUserSearchQuery } from "./app/apiSlice";
import UserCard from "./UserCard";


const UserLists = ({ name }) => {
    const searchField = useSelector((state) => state.searchField.value);
    const { data: searchUsers, isLoading: searchLoad } = useGetUserSearchQuery(searchField, { skip: name!=="User Search" });
    if (searchLoad) {
        return <div>Loading...</div>
    }
    return (<>
        <h1>{name}</h1>
        {name==="User Search" && searchUsers?.map((user) => <UserCard user={user} />)}
    </>);
}

export default UserLists;
