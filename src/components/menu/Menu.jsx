import React, { useState, useEffect } from "react";
import Header from "../Header/Header";

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", price: "", image: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(
                    "https://craftmyplate-backend-rjc0.onrender.com/api/menu"
                );
                if (response.ok) {
                    const data = await response.json();
                    setMenuItems(data);
                    setLoading(false);
                } else {
                    console.error("Failed to fetch menu items");
                }
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleAddToCart = (item) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
            alert(
                `Your ${existingItem.name} has been successfully added to the cart.`
            );
        } else {
            cart.push({ ...item, quantity: 1 });
            alert(`Your ${item.name} has been successfully added to the cart.`);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const handleAddItem = () => {
        if (newItem.name && newItem.price) {
            setMenuItems([...menuItems, { ...newItem, id: Date.now() }]);
            setNewItem({ name: "", price: "", image: "" });
        }
    };

    const handleDeleteItem = (id) => {
        setMenuItems(menuItems.filter((item) => item.id !== id));
    };

    const filteredMenuItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-50">
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-gray-800 my-8 text-center">
                    Our Menu
                </h2>

                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for an item..."
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                {loading ? (
                    <div className="flex justify-center items-center space-x-2">
                        <div className="w-8 h-8 border-4 border-t-4 border-indigo-500 rounded-full animate-spin border-r-transparent"></div>
                        <span className="text-lg font-semibold text-gray-700">
                            Loading... Render is warming up! ⏳ Please give it a
                            moment! 😅
                        </span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMenuItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition transform hover:-translate-y-1"
                            >
                                <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg text-indigo-600 font-bold mt-2">
                                        ₹{item.price}
                                    </p>
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteItem(item.id)
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Add New Item
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <input
                            type="text"
                            value={newItem.name}
                            onChange={(e) =>
                                setNewItem({ ...newItem, name: e.target.value })
                            }
                            placeholder="Item name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="number"
                            value={newItem.price}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    price: parseFloat(e.target.value),
                                })
                            }
                            placeholder="Price"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            value={newItem.image}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    image: e.target.value,
                                })
                            }
                            placeholder="Image URL"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        onClick={handleAddItem}
                        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
                    >
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
}
