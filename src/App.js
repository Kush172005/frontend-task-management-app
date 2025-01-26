import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Menu from "./components/menu/Menu";
import Cart from "./components/cart/Cart";
import Order from "./components/order/Order";
import OrderHistory from "./components/order/OrderHistory";

const ProtectedRoute = ({ children }) => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) ? <Navigate to="/" replace /> : children;
};

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
                <Route path="/orderHistory" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}
