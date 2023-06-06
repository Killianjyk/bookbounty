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
    return (
        <div className="mx-auto my-6 block max-w-[80%] p-6 bg-orange-200 rounded-lg shadow hover:bg-orange-300 dark:bg-slate-800 dark:border-gray-700 dark:hover:bg-slate-600 animate-shad">
            <form>
                <div className="flex mb-4">
                    <div className="w-1/4">
                        <label className="underline">Rating:</label>
                        <div>
                            <input type="checkbox" name="stars" checked={formData.stars > 0} value={1} onChange={handleChange} />
                            <input type="checkbox" name="stars" checked={formData.stars > 1} value={2} onChange={handleChange} />
                            <input type="checkbox" name="stars" checked={formData.stars > 2} value={3} onChange={handleChange} />
                            <input type="checkbox" name="stars" checked={formData.stars > 3} value={4} onChange={handleChange} />
                            <input type="checkbox" name="stars" checked={formData.stars > 4} value={5} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="w-3/4">
                        <label className="underline">Text:</label>
                        <textarea type="text" name="text" id="text" value={formData.text} onChange={handleChange} className="w-[100%] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
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
    );
}

export default ReviewForm;