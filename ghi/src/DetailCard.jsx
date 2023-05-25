

const DetailCard = ({ book }) => {
  return (
    <div className="card">
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <div>
        <img src={book.image} alt={book.title} />
        <p>{book.description}</p>
      </div>
    </div>
  );
}

export default DetailCard;