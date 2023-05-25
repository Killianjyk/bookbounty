import { useState } from 'react';
import { useGetRandomQuery } from './app/booksApi';

const Random = () => {
  const { data, isLoading, refetch } = useGetRandomQuery();
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    refetch().finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <h1>Random</h1>
      <div>
        <button type='button' className='btn btn-info' onClick={handleButtonClick} disabled={isLoading || loading}>
          Random!
        </button>
        <br></br><br></br>
        {(isLoading || loading) && (
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        )}
        {data && !isLoading && !loading && (
          <>
            <div>{data.work_id}</div>
            <div>
              <img src={data.image} alt="Book cover" />
            </div>
            <div>{data.title}</div>
            <div>{data.author}</div>
            <div>{data.description === 'NO DESCRIPTION PROVIDED' ? null : data.description}</div>
          </>
        )}
      </div>
    </>
  );
};

export default Random;
