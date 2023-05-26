import { useSelector } from "react-redux";
import { useGetBookSearchQuery, useGetTopFavoriteBooksQuery } from "./app/apiSlice";
import BookCard from "./BookCard";



const BookLists = ({ name }) => {
    const searchField = useSelector((state) => state.searchField.value)
    const { data: searchBooks, isLoading: searchLoad } = useGetBookSearchQuery(searchField, {skip: name!=="Search Books" || searchField==="" });
    const { data: topFavoriteBooks, isLoading: topFavoritesLoad } = useGetTopFavoriteBooksQuery({skip: name!=="Most Liked"})
    if (searchLoad || topFavoritesLoad) return <div>Loading...</div>;
    return (<>
        <h1>{name}</h1>
        {name==="Search Books" && searchBooks?.map((book) => <BookCard book={book} />)}
        {name==="Most Liked" && topFavoriteBooks?.map((book) => <BookCard book={book} />)}
    </>);
}

export default BookLists;
