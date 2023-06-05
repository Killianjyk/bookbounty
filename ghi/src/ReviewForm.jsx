import { useMakeReviewMutation, useUpdateReviewMutation } from "./app/reviewApiSlice";
import { useDeleteBookReviewMutation } from "./app/reviewApiSlice";
import { useState } from "react";


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
    return (<>
        <form className="border">
            <div className="flex mb-4">
                <div className="flex w-1/4">
                    <label>Rating</label>
                    <div>
                        <input type="checkbox" name="stars" checked={formData.stars > 0} value={1} onChange={handleChange} />
                        <input type="checkbox" name="stars" checked={formData.stars > 1} value={2} onChange={handleChange} />
                        <input type="checkbox" name="stars" checked={formData.stars > 2} value={3} onChange={handleChange} />
                        <input type="checkbox" name="stars" checked={formData.stars > 3} value={4} onChange={handleChange} />
                        <input type="checkbox" name="stars" checked={formData.stars > 4} value={5} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex w-3/4">
                    <label>Text</label>
                    <div>
                        <input type="text" name="text" id="text" value={formData.text} onChange={handleChange} />
                    </div>
                </div>
            </div>
            { editStatus ? <>
                <button onClick={(event) => handleUpdate(event)}>Update</button>
                <button onClick={(event) => handleDeleteReview(event)}>Delete</button>
                    </>:
                <button onClick={(event) => handleCreate(event)}>Submit</button>
            }
        </form>
    </>);
}

export default ReviewForm;