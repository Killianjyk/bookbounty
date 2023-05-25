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
    <>
      <h1 className="text-center">Random</h1>
      <div className="text-center">
        <button type='button' className='btn btn-info' onClick={handleButtonClick} disabled={isLoading || loading}>
          Random!
        </button>
        <br></br><br></br>
        {(isLoading || loading) && (
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        )}
        {book && !isLoading && !loading && <DetailCard book={book}/> }
      </div>
    </>
  );
};

export default Random;
