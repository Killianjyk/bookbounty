import { useState } from "react";
import { useGetUserQuery, useUpdateUserInfoMutation } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";


const UserDetails = () => {
    const navigate = useNavigate();
    const { data: user, refetch } = useGetUserQuery();
    const [updateUser] = useUpdateUserInfoMutation();

    const [formData, setFormData] = useState({
        full_name: user?.full_name || "",
        email: user?.email || "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(
                formData
            );
            refetch();
            console.log(formData);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
        <h1 className="txt">User Details</h1>
        <div className="txt">
            {user && (<>
            <p>Username: {user.username}</p>
                <form className="txt" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="full_name">Full Name:</label>
                        <input className="bg-white dark:bg-black" name="full_name" id="full_name" value={formData.full_name} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input className="bg-white dark:bg-black" name="email" id="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input className="bg-white dark:bg-black" name="password" placeholder="*******" value={formData.password} onChange={handleChange}/>
                    </div>
                    <button className="btn" type="submit">Update</button>
                </form>
            </>)}
        </div>
        </>
    );
};

export default UserDetails;
