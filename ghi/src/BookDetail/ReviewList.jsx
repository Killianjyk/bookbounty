import { useGetBooksReviewsQuery } from "../app/reviewApiSlice";
import { useGetUserQuery } from "../app/authApiSlice";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

const ReviewList = ({ workId }) => {
  const { data: user } = useGetUserQuery();
  const { data: reviews, isLoading } = useGetBooksReviewsQuery(workId);
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
  return (
    <>
      {user && user.username === reviews[0]?.username ? (
        <ReviewForm workId={workId} reviewData={reviews[0]} editStatus={true} />
      ) : (
        user && <ReviewForm workId={workId} editStatus={false} />
      )}
      {reviews?.map((review) => (
        <ReviewCard review={review} key={review.username + review.work_id} />
      ))}
    </>
  );
};

export default ReviewList;
