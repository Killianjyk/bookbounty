

const BookCard = ({ book }) => {
    return (<>
        <div className="card mb-3">
            <div className="card-title">{book.title}</div>
        </div>
    </>);
}

export default BookCard;
