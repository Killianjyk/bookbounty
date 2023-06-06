import { useSelector } from "react-redux";
import {
    useGetBookSearchQuery,
    useGetTopFavoriteBooksQuery,
} from "./app/booksApiSlice";
import {
    useGetFavoriteBooksQuery,
    useGetPreviousBooksQuery,
    useGetNextBooksQuery,
} from "./app/listApiSlice"
import BookCard from "./BookCard";


const BookLists = ({ name, username }) => {
    const searchField = useSelector((state) => state.searchField.value);
    const { data: searchBooks, isLoading: searchLoad } = useGetBookSearchQuery(searchField, {skip: name!=="Search Books" || searchField==="" });
    const { data: topFavoriteBooks, isLoading: topFavoritesLoad } = useGetTopFavoriteBooksQuery({skip: name!=="Most Liked"});
    const { data: favoriteBooks, isLoading: favoritesLoad } = useGetFavoriteBooksQuery(username, {skip: name!=="Favorites" || username===undefined});
    const { data: previousBooks, isLoading: previousLoad } = useGetPreviousBooksQuery(username, {skip: name!=="Previously Read" || username===undefined});
    const { data: nextBooks, isLoading: nextLoad } = useGetNextBooksQuery(username, {skip: name!=="Read Next" || username===undefined});
    if (searchLoad || topFavoritesLoad || favoritesLoad || previousLoad || nextLoad) return <div className="txt">Loading...</div>;

    let num = 1;

    return (<>
        <h1 className="txt text-3xl text-center mt-4">{name}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {name==="Search Books" && searchBooks?.map((book) => <BookCard book={book} />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {name==="Favorites" && favoriteBooks?.map((book) => <BookCard book={book} />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {name==="Previously Read" && previousBooks?.map((book) => <BookCard book={book} />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {name==="Read Next" && nextBooks?.map((book) => <BookCard book={book} />)}
        </div>
    </>);
}

export default BookLists;
