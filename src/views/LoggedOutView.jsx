import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = () => {
    return (
        <div className="text-center mt-20">
            <h1>Home</h1>
            <Link to="/login">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    Login
                </button>
            </Link>
            <Link to="/register">
                <button className="bg-green-500 text-white py-2 px-4 rounded ml-2">
                    Register
                </button>
            </Link>
        </div>
    );
};

export default LoggedOutView;
