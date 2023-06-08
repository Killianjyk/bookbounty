import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../app/booksApiSlice";
import DetailCard from "./DetailCard";

const BookDetails = () => {
  const { workId } = useParams();
  const { data: book, error, isLoading } = useGetBookQuery(workId);
  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center items-center">
        <div className="book">
          <div className="book__pg-shadow"></div>
          <div className="book__pg"></div>
          <div className="book__pg book__pg--2"></div>
          <div className="book__pg book__pg--3"></div>
          <div className="book__pg book__pg--4"></div>
          <div className="book__pg book__pg--5"></div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <DetailCard book={book} />;
};

export default BookDetails;
