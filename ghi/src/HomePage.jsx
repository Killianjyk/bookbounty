import { Link } from "react-router-dom";
import BookLists from "./BookLists";


const HomePage = () => {
  return (
    <div className="px-4 py-5 my-5 text-center txt">
    <div className="bg-orange-200 dark:bg-slate-800 text-center rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl w-full my-2">
      <h1 className="text-5xl font-bold">BookBounty</h1>
      <div className="">
        <p className="m-4">
          Discover your favorite books!
        </p>
      </div>
    </div>
    <div className="bg-orange-200 dark:bg-slate-800 text-center rounded-lg py-2 ring-1 ring-slate-900/5 shadow-xl w-full my-4">
        <p className="m-4">Try our new random book feature!</p>
        <a className="btn btn-secondary mb-4" href="/random">Random Book</a>
    </div>
    <div>
      <BookLists name="Most Liked"/>
    </div>
    </div>
  );
}

export default HomePage;
