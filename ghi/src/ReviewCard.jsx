import { useDeleteBookReviewMutation } from "./app/reviewApiSlice";
import { useGetUserQuery } from "./app/authApiSlice";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

const ReviewCard = ({ review }) => {
    const [editStatus, setEditStatus] = useState(false);
    const { data: user } = useGetUserQuery();
    const [deleteReview] = useDeleteBookReviewMutation();
    if (editStatus) {return <ReviewForm workId={review.work_id} reviewData={review} editStatus={editStatus}/>}
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
        {user?.username===review?.username && <>
        <button onClick={(event) => {event.preventDefault(); deleteReview(review.work_id.substring(7));}}>Delete</button>
        <button onClick={(event) => {event.preventDefault(); setEditStatus(true);}}>Update</button>
        </>}
    </div>);
}

export default ReviewCard;