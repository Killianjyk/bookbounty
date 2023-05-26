import Buttons from "./Buttons";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    return (<Link to={book.work_id}>
        <div className="card mb-3 txt">
            <div className="card-title">{book.title}</div>
            <div>{book.author}</div>
        </div>
        {/* {user && <Buttons />} */}
    </Link>);
}

export default BookCard;
