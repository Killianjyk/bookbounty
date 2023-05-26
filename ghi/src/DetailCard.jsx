

const DetailCard = ({ book }) => {
  return (
    <div className="block mx-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <div>
        <img className="mx-auto" src={book.image} alt={book.title} />
        <p>{book.description}</p>
      </div>
    </div>
  );
}

export default DetailCard;
