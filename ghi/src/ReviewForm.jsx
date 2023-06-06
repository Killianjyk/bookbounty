import { useMakeReviewMutation, useUpdateReviewMutation } from "./app/reviewApiSlice";
import { useDeleteBookReviewMutation } from "./app/reviewApiSlice";
import { useState } from "react";
import './reviewstars.css';


const ReviewForm = ({ workId, reviewData, editStatus }) => {
    const [deleteReview] = useDeleteBookReviewMutation();
    const [updateReview] = useUpdateReviewMutation();
    const [makeReview] = useMakeReviewMutation();
    const [formData, setFormData] = useState({
        stars: reviewData?.stars || 0,
        text: reviewData?.text || "",
        work_id: "/books/" + workId,
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value,});
    };
    const handleDeleteReview = (event) =>{
        event.preventDefault();
        deleteReview(workId);
        setFormData({
            stars: 0,
            text: "",
            work_id: "/books/" + workId
        })
    }
    const handleUpdate = async (event) => {
        event.preventDefault();
        await updateReview(formData);
    }
    const handleCreate = async (event) => {
        event.preventDefault();
        await makeReview(formData);
    }

    const handleStarClick = (clickedStar) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        stars: clickedStar,
      }));
    };

    return (
      <>
        <form className="border">
          <div className="flex mb-4">
            <div className="flex w-1/4">
              <label>Rating</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${formData.stars >= star ? 'active' : ''}`}
                    onClick={() => handleStarClick(star)}
                >
                    &#9733;
                </span>
                ))}
              </div>
            </div>
            <div className="flex w-3/4">
              <label>Text</label>
              <div>
                <input
                  type="text"
                  name="text"
                  id="text"
                  value={formData.text}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {editStatus ? (
            <>
              <button onClick={(event) => handleUpdate(event)}>Update</button>
              <button onClick={(event) => handleDeleteReview(event)}>
                Delete
              </button>
            </>
          ) : (
            <button onClick={(event) => handleCreate(event)}>Submit</button>
          )}
        </form>
      </>
    );
}

export default ReviewForm;
