const ReviewCard = ({ review }) => {
  return (
    <div className="mx-auto my-6 block max-w-[80%] p-6 bg-orange-300 rounded-lg shadow dark:bg-slate-600 dark:border-gray-700 animate-shad">
      <div className="md:flex mb-4 border rounded-lg">
        <div className="w-fill txt p-3">
          <span className="p-4 underline">Review by:</span>{" "}
          <span className="p-4">{review?.username}</span>
        </div>
        <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400 visually-hidden"
                    checked={review.stars === star}
                    readOnly
                  />
                ))}
              </div>
      </div>
      <div className="flex mb-4 border rounded-lg">
        <div className="w-full txt p-4">{review.text}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
