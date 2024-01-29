import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupervisorDashboard from "./dashboard";

function Supervisor() {
    return (
        <Routes>
            <Route path="dashboard" element={<SupervisorDashboard />} />
        </Routes>
    );
};

export default Supervisor;