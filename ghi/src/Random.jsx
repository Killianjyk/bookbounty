import { useState } from 'react';
import { useGetRandomQuery } from './app/booksApiSlice';
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
            <div className="book">
              <div className="book__pg-shadow"></div>
              <div className="book__pg"></div>
              <div className="book__pg book__pg--2"></div>
              <div className="book__pg book__pg--3"></div>
              <div className="book__pg book__pg--4"></div>
              <div className="book__pg book__pg--5"></div>
            </div>
          </div>
        )}
        {book && !isLoading && !loading && <DetailCard book={book}/> }
      </div>
    </div>
  );
};

export default Random;
