import { Link } from "react-router-dom";
import BookLists from "./BookLists";


const HomePage = () => {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Book Bounty</h1>
      <div className="col-lg-6 mx-auto">
          <Link to="/random">Random Book</Link>
      </div>
      <div>
        <BookLists name="Most Liked"/>
      </div>
    </div>
  );
}

export default HomePage;
