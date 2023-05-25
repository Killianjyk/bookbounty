import { useSelector } from "react-redux";
import { useGetBookSearchQuery } from "./app/apiSlice";
import { useEffect } from "react";


const BookLists = ({ name }) => {
    const searchField = useSelector((state) => state.searchField.value)
    const { data, isLoading } = useGetBookSearchQuery(searchField, {skip: name!=="search" || searchField==="" });
    console.log(data)
    if (isLoading) return <div>Loading...</div>;
    return (<>
        <h1>{name}</h1>
    </>);
}

export default BookLists;