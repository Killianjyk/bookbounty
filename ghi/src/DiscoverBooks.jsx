import { Link } from "react-router-dom";
import Search from "./Search";
import BookLists from "./BookLists";

const DiscoverBooks = () => {
  return (
    <>
      <div className="h-full">
        <h1 className="text-center text-3xl txt mt-4">Discover Books</h1>
        <div className="px-4">
          <div className="bg-orange-200 dark:bg-slate-800 text-center rounded-lg py-2 ring-1 ring-slate-900/5 shadow-xl w-full my-4">
            <p className="txt m-4">Try our new random book feature!</p>
            <Link className="btn btn-secondary mb-4" to="/random">
              Random Book
            </Link>
          </div>
        </div>
        <div className="mx-8 mt-8 text-bg-light">
          <div className="">
            <Search type="Books" />
          </div>
        </div>
        <div>
          <BookLists name="Search Books" />
        </div>
      </div>
    </>
  );
};

export default DiscoverBooks;
