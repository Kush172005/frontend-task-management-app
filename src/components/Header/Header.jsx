import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", false);
        navigate("/login");
    };

    return (
        <div>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex justify-between items-center h-16">
                        <div
                            onClick={() => {
                                navigate("/");
                            }}
                            className="flex items-center gap-4 cursor-pointer"
                        >
                            <div>
                                <img
                                    src="https://craftmyplate.com/wp-content/uploads/2023/07/CMP-logo-with-Bg.svg"
                                    alt="Craft My Plate"
                                />
                            </div>
                            <span className="text-3xl font-serif">
                                Craft My Plate
                            </span>
                        </div>
                        <div className="flex space-x-6 items-center">
                            <Link
                                to="/"
                                className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition duration-200"
                            >
                                Menu
                            </Link>
                            <Link
                                to="/cart"
                                className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition duration-200"
                            >
                                Cart
                            </Link>
                            <Link
                                to="/order"
                                className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition duration-200"
                            >
                                Order
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-lg font-medium text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
