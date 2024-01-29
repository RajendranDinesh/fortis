import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./dashboard";

function Admin() {
    return (
        <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
        </Routes>
    );
};

export default Admin;