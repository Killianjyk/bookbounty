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
    <div className="h-full mb-4">
      <h1 className="text-center text-3xl txt my-4">Random</h1>
      <div className="txt text-center">
        <button type='button' className='btn btn-secondary' onClick={handleButtonClick} disabled={isLoading || loading}>
          Random!
        </button>
        {(isLoading || loading) && (
          <div className="mt-4 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        {book && !isLoading && !loading && <DetailCard book={book}/> }
      </div>
    </div>
  );
};

export default Random;
