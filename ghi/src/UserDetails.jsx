import { useState } from "react";
import { useGetUserQuery, useUpdateUserInfoMutation } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";


const UserDetails = () => {
    const navigate = useNavigate();
    const { data: user, refetch } = useGetUserQuery();
    const [updateUser] = useUpdateUserInfoMutation();

    const [formData, setFormData] = useState({
        full_name: "",
        email: user?.email || "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ ...formData })

            refetch();
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
        <h1>User Details</h1>
        <div>
            {user && (
            <>
            <p>Username: {user.username}</p>
            <form onSubmit={onSubmit}>
                <label>
                    Full Name:
                    <input type="full_name" name="full_name" value={formData.full_name} onChange={handleChange}/>
                </label>
                <label>Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                </label>
                <button type="submit">
                    Update
                </button>
            </form>
            </>
            )}
        </div>
        </>
    );
};

export default UserDetails;
