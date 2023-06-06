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
    return (<>
    <div className="mx-auto my-6 block max-w-[80%] p-6 bg-orange-300 rounded-lg shadow dark:bg-slate-600 dark:border-gray-700 animate-shad">
            <form>
                <div className="flex mb-4">
                    <div className="w-1/4">
                        <label className="underline txt p-4">Rating:</label>
                        <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className={`star ${formData.stars >= star ? 'active' : ''}`} onClick={() => handleStarClick(star)}>&#9733;</span>
                            ))}
                        </div>
                    </div>
                    <div className="w-3/4">
                        <label className="underline txt p-4">Text:</label>
                        <textarea type="text" name="text" id="text" value={formData.text} onChange={handleChange} className="w-[100%] bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 txt" />
                    </div>
                </div>
                <div className="text-center"> { editStatus ? <>
                    <button className="btn" onClick={(event) => handleUpdate(event)}>Update</button>
                    <button className="btn" onClick={(event) => handleDeleteReview(event)}>Delete</button>
                        </>:
                    <button className="btn" onClick={(event) => handleCreate(event)}>Submit</button>
                }</div>
            </form>
        </div>
    </>);
}

export default ReviewForm;
