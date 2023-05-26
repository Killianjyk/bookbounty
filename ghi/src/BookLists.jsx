import { useSelector } from "react-redux";
import { useGetBookSearchQuery } from "./app/apiSlice";
import BookCard from "./BookCard";


const BookLists = ({ name }) => {
    const searchField = useSelector((state) => state.searchField.value)
    const { data, isLoading } = useGetBookSearchQuery(searchField, {skip: name!=="search" || searchField==="" });
    if (isLoading) return <div>Loading...</div>;
    return (<>
        <h1>{name}</h1>
        {data?.map((book) => <BookCard book={book} />)}
    </>);
}

export default BookLists;
