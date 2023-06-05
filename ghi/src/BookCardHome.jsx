import { Link } from "react-router-dom";


const BookCardHome = ({ book }) => {
    return (
    <Link to={book.work_id} className="container block max-w-full p-1 bg-orange-200 rounded-lg shadow hover:bg-orange-300 dark:bg-slate-800 dark:border-gray-700 dark:hover:bg-slate-600 animate-shad">
        <p className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{(book.title.length > 30) ? book.title.slice(0, 27) + "..." : book.title}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{book.author}</p>
    </Link>);
}

export default BookCardHome;
