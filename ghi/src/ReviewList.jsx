import { useGetBooksReviewsQuery } from "./app/reviewApiSlice";
import ReviewCard from "./ReviewCard";


const ReviewList = ({ workId }) => {
    const { data: reviews, isLoading } = useGetBooksReviewsQuery(workId);
    if (isLoading) {return <div>...Loading</div>;};
    return (<>
        {reviews?.map((review) => <ReviewCard review={review}/>)}
    </>);
}

export default ReviewList;