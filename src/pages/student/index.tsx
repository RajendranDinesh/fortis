import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "./dashboard";

function Student() {
    return (
        <Routes>
            <Route path="dashboard" element={<StudentDashboard />} />
        </Routes>
    );
};

export default Student;