import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffDashboard from "./dashboard";
import Classroom from "./Classroom";

function Staff() {
    return (
        <Routes>
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="classroom" element={<Classroom />} />
        </Routes>
    );
};

export default Staff;