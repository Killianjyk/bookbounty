

const ReviewCard = ({ review }) => {
    return (
    <div className="mx-auto my-6 block max-w-[80%] p-6 bg-orange-200 rounded-lg shadow hover:bg-orange-300 dark:bg-slate-800 dark:border-gray-700 dark:hover:bg-slate-600 animate-shad">
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
