import React, { useState, useEffect } from "react";
import Header from "../Header/Header";

export default function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const history = JSON.parse(
            localStorage.getItem("orderHistory") || "[]"
        );
        setOrderHistory(history);
    }, []);

    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Order History
                </h2>

                {orderHistory.length === 0 ? (
                    <p className="text-lg text-gray-600 text-center">
                        You don't have any order history yet.
                    </p>
                ) : (
                    <div>
                        {orderHistory.map((order, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md mb-6 p-6"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Order placed on: {order.date}
                                </h3>
                                <div>
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center py-2 border-b last:border-b-0"
                                        >
                                            <span className="text-gray-800">
                                                {item.name} x{item.quantity}
                                            </span>
                                            <span className="font-medium text-indigo-600">
                                                ₹{item.price * item.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center font-bold">
                                        <span className="text-xl text-gray-900">
                                            Total:
                                        </span>
                                        <span className="text-xl text-indigo-600">
                                            ₹{order.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
