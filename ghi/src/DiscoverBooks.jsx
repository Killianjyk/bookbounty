import { Link } from "react-router-dom";
import Search from "./Search";
import BookLists from "./BookLists";


const DiscoverBooks = () => {

  return (
  <>
  <div className="h-full">
        <h1 className="text-center text-3xl txt mt-4">Discover Books</h1>
        <div className="card text-bg-light mb-3">
          <div className="card-body">
            <Search type="Books" />
          </div>
          <div className="card-body text-center">
            <Link to="/random" className="btn btn-secondary">Random Book</Link>
          </div>
        </div>
        <div>
          <BookLists name="Search Books"/>
        </div>
  </div>
    </>
    )
};

export default DiscoverBooks;
