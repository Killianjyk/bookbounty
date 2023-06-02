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
import BookCardHome from "./BookCardHome";
import Slider from 'react-slick';


const BookLists = ({ name, username }) => {
    const searchField = useSelector((state) => state.searchField.value);
    const { data: searchBooks, isLoading: searchLoad } = useGetBookSearchQuery(searchField, {skip: name!=="Search Books" || searchField==="" });
    const { data: topFavoriteBooks, isLoading: topFavoritesLoad } = useGetTopFavoriteBooksQuery({skip: name!=="Most Liked"});
    const { data: favoriteBooks, isLoading: favoritesLoad } = useGetFavoriteBooksQuery(username, {skip: name!=="Favorites" || username===undefined});
    const { data: previousBooks, isLoading: previousLoad } = useGetPreviousBooksQuery(username, {skip: name!=="Previously Read" || username===undefined});
    const { data: nextBooks, isLoading: nextLoad } = useGetNextBooksQuery(username, {skip: name!=="Read Next" || username===undefined});
    if (searchLoad || topFavoritesLoad || favoritesLoad || previousLoad || nextLoad) return <div className="txt">Loading...</div>;

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Allow infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1 // Number of slides to scroll at a time
  };


    let num = 1;
    let num2 = 0;


    return (<>
        <h1 className="txt text-3xl text-center mt-4">{name}</h1>
        {name==="Search Books" && searchBooks?.map((book) => <BookCard book={book} />)}


<div className="container mx-auto">
  <table className="table mx-auto">
    <tbody>
        {
        name==="Most Liked" && topFavoriteBooks?.map((book) => <>
<tr className="">
  <th className="border-none bg-orange-100 dark:bg-slate-700">{num++}</th>
  <td className="border-none bg-orange-100 dark:bg-slate-700">
    <BookCardHome book={book} />
  </td>
</tr>
        </>)
        }
    </tbody>
  </table>
</div>

        {name==="Favorites" && favoriteBooks?.map((book) => <BookCard book={book} />)}
        {name==="Previously Read" && previousBooks?.map((book) => <BookCard book={book} />)}
        {name==="Read Next" && nextBooks?.map((book) => <BookCard book={book} />)}
    </>);
}

export default BookLists;
