import { useState } from "react";
import { useGetUserQuery } from "./app/apiSlice";
import { redirect, useNavigate } from "react-router-dom";


const UserDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    return (
        <>
        <h1>User Details</h1>
        <div>
            {user &&
            <>
            <p>Username: {user.username}</p>
            <p>Full Name: {user.full_name}</p>
            <p>Email: {user.email}</p>
            </>
            }
        </div>
        </>
    );
};

export default UserDetails;
