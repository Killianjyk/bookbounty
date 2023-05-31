import Buttons from "./Buttons";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "./app/authApiSlice";

const BookCard = ({ book }) => {
    const { data: user } = useGetUserQuery();
    return (
    <Link to={book.work_id} className="mx-auto my-6 block max-w-sm p-6 bg-orange-200 rounded-lg shadow hover:bg-orange-300 dark:bg-slate-800 dark:border-gray-700 dark:hover:bg-slate-600 animate-shad">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{book.author}</p>
        {user && <Buttons work_id={book.work_id.substring(7)} />}
    </Link>);
}

export default BookCard;
