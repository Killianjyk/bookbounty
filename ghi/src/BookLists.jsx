import { useSelector } from "react-redux";
import { useGetBookSearchQuery } from "./app/booksApiSlice";
import {
  useGetFavoriteBooksQuery,
  useGetPreviousBooksQuery,
  useGetNextBooksQuery,
} from "./app/listApiSlice";
import BookCard from "./BookCard";

const BookLists = ({ name, username }) => {
  const searchField = useSelector((state) => state.searchField.value);
  const { data: searchBooks, isLoading: searchLoad } = useGetBookSearchQuery(
    searchField,
    { skip: name !== "Search Books" || searchField === "" }
  );
  const { data: favoriteBooks, isLoading: favoritesLoad } =
    useGetFavoriteBooksQuery(username, {
      skip: name !== "Favorites" || username === undefined,
    });
  const { data: previousBooks, isLoading: previousLoad } =
    useGetPreviousBooksQuery(username, {
      skip: name !== "Previously Read" || username === undefined,
    });
  const { data: nextBooks, isLoading: nextLoad } = useGetNextBooksQuery(
    username,
    { skip: name !== "Read Next" || username === undefined }
  );
  if (
    searchLoad ||
    favoritesLoad ||
    previousLoad ||
    nextLoad
  )
    return (
      <div className="mt-4 flex justify-center items-center">
        <div className="book">
          <div className="book__pg-shadow"></div>
          <div className="book__pg"></div>
          <div className="book__pg book__pg--2"></div>
          <div className="book__pg book__pg--3"></div>
          <div className="book__pg book__pg--4"></div>
          <div className="book__pg book__pg--5"></div>
        </div>
      </div>
    );
  let listTitle = name;
  if (username) {
    listTitle = `${username}- ${name}`;
  }

  return (
    <>
      <h1 className="txt text-3xl text-center mt-4">{listTitle}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {name==="Search Books" && searchBooks?.map((book) => <BookCard book={book} key={book.work_id} />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {name==="Favorites" && favoriteBooks?.map((book) => <BookCard book={book} key={book.work_id} />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {name==="Previously Read" && previousBooks?.map((book) => <BookCard book={book} key={book.work_id} />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {name==="Read Next" && nextBooks?.map((book) => <BookCard book={book} key={book.work_id} />)}
        </div>
    </>);
};

export default BookLists;
