import { useSelector } from "react-redux";
import {
    useGetBookSearchQuery,
    useGetTopFavoriteBooksQuery,
    useGetFavoriteBooksQuery,
    useGetPreviousBooksQuery,
    useGetNextBooksQuery,
} from "./app/apiSlice";
import BookCard from "./BookCard";


const BookLists = ({ name, username }) => {
    const searchField = useSelector((state) => state.searchField.value);
    const { data: searchBooks, isLoading: searchLoad } = useGetBookSearchQuery(searchField, {skip: name!=="Search Books" || searchField==="" });
    const { data: topFavoriteBooks, isLoading: topFavoritesLoad } = useGetTopFavoriteBooksQuery({skip: name!=="Most Liked"});
    const { data: favoriteBooks, isLoading: favoritesLoad } = useGetFavoriteBooksQuery(username, {skip: name!=="Favorites" || username===undefined});
    const { data: previousBooks, isLoading: previousLoad } = useGetPreviousBooksQuery(username, {skip: name!=="Previously Read" || username===undefined});
    const { data: nextBooks, isLoading: nextLoad } = useGetNextBooksQuery(username, {skip: name!=="Read Next" || username===undefined});
    if (searchLoad || topFavoritesLoad || favoritesLoad || previousLoad || nextLoad) return <div className="txt">Loading...</div>;
    return (<>
        <h1 className="txt text-3xl text-center mt-4">{name}</h1>
        {name==="Search Books" && searchBooks?.map((book) => <BookCard book={book} />)}
        {name==="Most Liked" && topFavoriteBooks?.map((book) => <BookCard book={book} />)}
        {name==="Favorites" && favoriteBooks?.map((book) => <BookCard book={book} />)}
        {name==="Previously Read" && previousBooks?.map((book) => <BookCard book={book} />)}
        {name==="Read Next" && nextBooks?.map((book) => <BookCard book={book} />)}
    </>);
}

export default BookLists;
