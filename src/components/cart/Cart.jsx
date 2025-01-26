import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { Trash2, ArrowLeft } from "lucide-react";

export default function Cart() {
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("cart") || "[]")
    );
    const navigate = useNavigate();

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCartItemDelete = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
    };

    return (
        <>
            <Header />
            {items.length === 0 || !items ? (
                <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-600 text-lg text-center">
                        Your cart is empty.
                    </p>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                        Your Cart
                    </h2>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center py-4 border-b"
                        >
                            <div className="flex items-center">
                                <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                                <div className="flex flex-col gap-2">
                                    <span className="text-lg font-medium text-gray-900">
                                        {item.name} (x{item.quantity})
                                    </span>
                                    <div>₹{item.price}</div>
                                </div>
                            </div>
                            <div className="flex items-center flex-col gap-2 ">
                                <span className="text-lg font-bold text-indigo-600">
                                    ₹{item.price * item.quantity}
                                </span>
                                <button
                                    onClick={() => handleCartItemDelete(index)}
                                    className="flex justify-center border-2 rounded-md p-1 text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-8 pt-4 border-t">
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-900">
                                Total:
                            </span>
                            <span className="text-2xl font-bold text-indigo-600">
                                ₹{total}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-8">
                            <div
                                onClick={() => navigate("/")}
                                className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700 transition"
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                <span className="font-semibold">
                                    Back to Menu
                                </span>
                            </div>
                            <div className="flex justify-center w-[80%]">
                                <button
                                    onClick={() => navigate("/order")}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mr-[25%]"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
