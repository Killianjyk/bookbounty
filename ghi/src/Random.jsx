import { useState } from 'react';
import { useGetRandomQuery } from './app/booksApi';
import DetailCard from './DetailCard';

const Random = () => {
  const { data: book, isLoading, refetch } = useGetRandomQuery();
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    refetch().finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="">
      <h1 className="">Random</h1>
      <div className="text-center">
        <button type='button' className='btn btn-info' onClick={handleButtonClick} disabled={isLoading || loading}>
          Random!
        </button>
        <br></br><br></br>
        {(isLoading || loading) && (
          <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        {book && !isLoading && !loading && <DetailCard book={book}/> }
      </div>
    </div>
  );
};

export default Random;
