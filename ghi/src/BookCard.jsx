import Buttons from "./Buttons";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    return (
    <Link to={book.work_id} className="mx-auto my-2 block max-w-sm p-6 bg-orange-200 rounded-lg shadow hover:bg-orange-300 dark:bg-slate-800 dark:border-gray-700 dark:hover:bg-slate-600 animate-shad">

        {/* <div className="card mb-3 txt">
            <div className="card-title">{book.title}</div>
            <div>{book.author}</div>
        </div>
        {user && <Buttons />} */}



    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{book.author}</p>




    </Link>);
}

export default BookCard;
