import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffDashboard from "./dashboard";

function Staff() {
    return (
        <Routes>
            <Route path="dashboard" element={<StaffDashboard />} />
        </Routes>
    );
};

export default Staff;