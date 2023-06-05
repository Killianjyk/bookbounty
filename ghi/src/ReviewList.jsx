import { useGetBooksReviewsQuery } from "./app/reviewApiSlice";
import { useGetUserQuery } from "./app/authApiSlice";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";


const ReviewList = ({ workId }) => {
    const { data: user } = useGetUserQuery();
    const { data: reviews, isLoading } = useGetBooksReviewsQuery(workId);
    if (isLoading) {return <div>...Loading</div>;};
    return (<>
        {user && user.username===reviews[0]?.username ? 
            <ReviewForm workId={workId}  reviewData={reviews[0]} editStatus={true} />
                :
            user && <ReviewForm workId={workId} editStatus={false} />
        }
        {reviews?.map((review) => <ReviewCard review={review} />)}
    </>);
}

export default ReviewList;