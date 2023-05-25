import Buttons from "./Buttons";

const BookCard = ({ book }) => {
    return (<>
        <div className="card mb-3">
            <div className="card-title">{book.title}</div>
            <div>{book.author}</div>
        </div>
        {/* {user && <Buttons />} */}
    </>);
}

export default BookCard;
