import { useParams } from "react-router-dom";
import { useGetBookQuery } from "./app/booksApiSlice";
import DetailCard from "./DetailCard";


const BookDetails = () => {
  const { workId } = useParams();
  const { data: book, error, isLoading } = useGetBookQuery(workId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }
  return (
    <DetailCard book={book} />
  );
};


export default BookDetails;
