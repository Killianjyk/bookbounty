import { useSelector, useDispatch } from "react-redux";
import { search } from "./app/SearchSlice";
import { useGetUserSearchQuery } from "./app/apiSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const UserLists = ({ name }) => {
    const dispatch = useDispatch();
    const searchField = useSelector((state) => state.searchField.value);
    const { data: searchUsers, isLoading: searchLoad } = useGetUserSearchQuery(searchField, { skip: name!=="User Search" });
    useEffect(() => {
        dispatch(search(searchField));
    }, []);
    if (searchLoad) {
        return <div>Loading...</div>
    }
    return (<>
        <h1>{name}</h1>
        {name==="User Search" && searchUsers?.map((user) => <UserCard user={user} />)}
    </>);
}

export default UserLists;
