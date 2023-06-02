import Buttons from "./Buttons";
import { useGetUserQuery } from "./app/authApiSlice";


const DetailCard = ({ book }) => {
  const { data: user } = useGetUserQuery();
  return (
    <div className="my-4 text-center block mx-auto max-w-sm p-6 bg-orange-200 border border-gray-200 rounded-lg shadow dark:bg-slate-800 dark:border-gray-700">
      <h1 className="txt text-3xl">{book.title}</h1>
      <h2 className="txt text-xl mb-4">{book.author}</h2>
      <div>
        <img className="mx-auto my-4" src={book.image} alt={book.title} />
        <p className="txt text-sm mb-4">{book.description}</p>
        {user && <Buttons work_id={book.work_id.substring(7)} />}
      </div>
    </div>
  );
}

export default DetailCard;
