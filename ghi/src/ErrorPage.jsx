import React from 'react';
import "./ErrorPage.css";
import { useNavigate } from 'react-router-dom';
import "./index.css";


const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="bg-components h-screen justify-center">
            <center className="mt-24 m-auto">
                <img
                className="dog-404"
                src="https://i.imgur.com/Tt02lJ7.png"
                alt="Picture1"
                />
                <div className="tracking-widest mt-4">
                    <span className="text-gray-500 text-6xl block">
                        <span>4 0 4</span>
                    </span>
                    <span className="text-gray-500 text-xl">
                        Sorry, We couldn't find what you are looking for!
                    </span>
                </div>
            </center>
            <center className="mt-6">
                <button
                onClick={handleGoBack}
                className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
                >
                Go back
                </button>
            </center>
        </div>
    );
};
export default ErrorPage;
