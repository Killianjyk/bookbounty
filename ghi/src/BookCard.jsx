import { Link } from "react-router-dom";
import { useGetUserQuery } from "./app/authApiSlice";

const BookCard = ({ book }) => {
    const { data: user } = useGetUserQuery();
    return (
    <Link to={book.work_id} className="mx-auto p-2 mx-1 block max-w-sm my-1 bg-orange-200 rounded-lg shadow hover:bg-orange-300 dark:bg-slate-800 dark:border-gray-700 dark:hover:bg-slate-600 animate-shad">
        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
        <p className="text-center font-normal text-gray-700 dark:text-gray-400">{book.author}</p>
        <img className="mx-auto" src={book.image}></img>
    </Link>
    );
}

export default BookCard;
