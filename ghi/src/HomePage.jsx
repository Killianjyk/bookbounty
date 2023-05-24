import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Book Bounty</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          <Link to="/random">Random Book</Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
