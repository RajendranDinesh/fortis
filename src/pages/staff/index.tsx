import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffDashboard from "./dashboard";
import Classroom from "./Classroom";
import Test from "./tests";
import AddProgramming from "./tests/addProgramming";

function Staff() {
    return (
        <Routes>
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="classroom/:id" element={<Classroom />} />
            <Route path="test/:testId" element={<Test />} />
            <Route path="test/:testId/programming" element={<AddProgramming />} />
        </Routes>
    );
};

export default Staff;