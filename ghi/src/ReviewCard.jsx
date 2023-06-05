import { useDeleteBookReviewMutation } from "./app/reviewApiSlice";
import { useGetUserQuery } from "./app/authApiSlice";

const ReviewCard = ({ review }) => {
    const { data: user } = useGetUserQuery();
    const [deleteReview] = useDeleteBookReviewMutation();
    return (
    <div className="border">
        <div className="flex mb-4">
            <div className="w-1/2">Review by: {review?.username}</div>
            <div className="w-1/2">
                <input type="checkbox" checked={review.stars > 0} readOnly/>
                <input type="checkbox" checked={review.stars > 1} readOnly/>
                <input type="checkbox" checked={review.stars > 2} readOnly/>
                <input type="checkbox" checked={review.stars > 3} readOnly/>
                <input type="checkbox" checked={review.stars > 4} readOnly/>
            </div>
        </div>
        <div className="flex mb-4">
            <div className="w-full">{review.text}</div>
        </div>
    </div>);
}

export default ReviewCard;