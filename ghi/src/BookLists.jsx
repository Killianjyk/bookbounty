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



const BookLists = ({ name, username }) => {
    const searchField = useSelector((state) => state.searchField.value);
    const { data: searchBooks, isLoading: searchLoad } = useGetBookSearchQuery(searchField, {skip: name!=="Search Books" || searchField==="" });
    const { data: topFavoriteBooks, isLoading: topFavoritesLoad } = useGetTopFavoriteBooksQuery({skip: name!=="Most Liked"});
    const { data: favoriteBooks, isLoading: favoritesLoad } = useGetFavoriteBooksQuery(username, {skip: name!=="Favorites" || username===undefined});
    const { data: previousBooks, isLoading: previousLoad } = useGetPreviousBooksQuery(username, {skip: name!=="Previously Read" || username===undefined});
    const { data: nextBooks, isLoading: nextLoad } = useGetNextBooksQuery(username, {skip: name!=="Read Next" || username===undefined});
    if (searchLoad || topFavoritesLoad || favoritesLoad || previousLoad || nextLoad) return <div className="txt">Loading...</div>;

    let num = 1;
    let num2 = 1;


    return (<>
        <h1 className="txt text-3xl text-center mt-4">{name}</h1>
        {name==="Search Books" && searchBooks?.map((book) => <BookCard book={book} />)}


{/* <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://www.hdcarwallpapers.com/walls/aston_martin_dbs_770_ultimate_2023_8k_3-HD.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://wallpapercave.com/wp/wp5636803.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://images.hdqwalls.com/wallpapers/ford-gt-2020-42.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div> */}


<div className="">

        {
        name==="Most Liked" && topFavoriteBooks?.map((book) => <>

  <div className="">{num2++}</div>
  <div className="">{console.log(book)}</div>

        </>)
        }

</div>





<div className="container mx-auto">
  <table className="table mx-auto">
    <tbody>
        {
        name==="Most Liked" && topFavoriteBooks?.map((book) => <>
<tr className="">
  <th className="z-10 border-none bg-orange-100 dark:bg-slate-700">{num++}</th>
  <div className="my-2 bg-orange-100 dark:bg-slate-700">
    <BookCardHome book={book} />
  </div>
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
