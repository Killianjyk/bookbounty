import { reset, searchBooks, searchUsers } from "./app/SearchSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Search = ({ type }) => {
  const dispatch = useDispatch();
  const [searchCriteria, setSearchCriteria] = useState(""); 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "Books") {
      dispatch(searchBooks(searchCriteria));
    }
    if (type === "User") {
      dispatch(searchUsers(searchCriteria));
    }
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <label className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
          </svg>
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`Search ${type}`}
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          required={ type === "User" ? false : true }
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ml-2 text-sm font-medium text-white bg-teal-500 rounded-lg border border-teal-500 hover:border-teal-800 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-600 dark:bg-teal-600 dark:border-teal-700 dark:hover:bg-teal-700 dark:focus:ring-teal-600"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>
      <button
        className="btn btn-link"
        type="button"
        onClick={() => {
          dispatch(reset);
          setSearchCriteria("");
        }}
      >
        Reset
      </button>
    </form>
  );
};
export default Search;
