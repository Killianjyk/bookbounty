import { Link } from "react-router-dom";
import Search from "./Search";
import BookLists from "./BookLists";


const DiscoverBooks = () => {

  return (<>
        <h1 className="card-header text-center">Discover Books</h1>
        <div className="card text-bg-light mb-3">
          <div className="card-body">
            <Search type="Books" />
          </div>
          <div className="card-body text-center">
            <Link to="/random" className="btn btn-primary">Random Book</Link>
          </div>
        </div>
        <div>
          <BookLists name="Search Books"/>
        </div>
    </>)
};

export default DiscoverBooks;
