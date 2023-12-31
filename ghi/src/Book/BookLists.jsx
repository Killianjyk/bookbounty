import { useSelector } from "react-redux";
import { useGetBookSearchQuery } from "../app/booksApiSlice";
import {
  useGetFavoriteBooksQuery,
  useGetPreviousBooksQuery,
  useGetNextBooksQuery,
} from "../app/listApiSlice";
import BookCard from "./BookCard";

const BookLists = ({ name, username }) => {
  const searchField = useSelector((state) => state.searchField.bookSearch);
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
  if (searchLoad || favoritesLoad || previousLoad || nextLoad)
    return (
      <div className="mt-8 flex justify-center place-items-center">
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
    listTitle = `${username} - ${name}`;
  }
  if (
    (!favoriteBooks || favoriteBooks.length === 0) &&
    (!previousBooks || previousBooks.length === 0) &&
    (!nextBooks || nextBooks.length === 0) &&
    (!searchBooks || searchBooks.length === 0)
  ) {
    return (
      <div className="bg-components h-fit text-center">
        <center className="">
          <img
            className="dog-404"
            src="https://i.imgur.com/Tt02lJ7.png"
            alt="Picture1"
          />
          {name !== "Search Books" && (
            <div className="tracking-widest mt-4 w-full">
              <span className="text-gray-500 text-6xl block">
                <span>Oops...</span>
              </span>
              <span className="text-gray-500 text-xl">
                Sorry, no books have been added to {username}'s {name} list yet!
              </span>
            </div>
          )}
        </center>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="txt text-3xl text-center my-4">{listTitle}</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {name === "Search Books" &&
            searchBooks?.map((book) => (
              <div key={book.work_id}>
                <BookCard book={book} />
              </div>
            ))}
          {name === "Favorites" &&
            favoriteBooks?.map((book) => (
              <div key={book.work_id}>
                <BookCard book={book} />
              </div>
            ))}
          {name === "Read Next" &&
            nextBooks?.map((book) => (
              <div key={book.work_id}>
                <BookCard book={book} />
              </div>
            ))}
          {name === "Previously Read" &&
            previousBooks?.map((book) => (
              <div key={book.work_id}>
                <BookCard book={book} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookLists;
