import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

export default function Order() {
    const [items, setItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setItems(cart);
    }, []);

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        localStorage.removeItem("cart");
    };

    return (
        <>
            <Header />
            {!orderPlaced ? (
                <div className="bg-white rounded-lg shadow-lg p-6 m-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                        Place Your Order
                    </h2>
                    {items.length === 0 ? (
                        <p className="text-gray-600 text-lg">
                            Your cart is empty. Add some items before placing an
                            order.
                        </p>
                    ) : (
                        <div>
                            <div className="bg-gray-50 p-4 rounded-lg mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Order Summary
                                </h3>
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-2 border-b last:border-b-0"
                                    >
                                        <span className="text-gray-800">
                                            {item.name}
                                        </span>
                                        <span className="font-medium text-indigo-600">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center font-bold">
                                        <span className="text-xl text-gray-900">
                                            Total:
                                        </span>
                                        <span className="text-xl text-indigo-600">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                            >
                                Place Order
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-gradient-to-br from-green-100 to-white rounded-2xl shadow-2xl p-8 text-center m-4">
                    <div className="m-6">
                        <div className=" text-white text-5xl font-bold  p-8 w-24 h-24 mx-auto flex items-center justify-center">
                            🎉
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-wide">
                        Order Placed!
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Thank you for your order! Your delicious food will be on
                        its way shortly.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold py-3 px-6 rounded-full hover:from-purple-500 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 shadow-lg"
                    >
                        Back to Menu
                    </button>
                </div>
            )}
        </>
    );
}
