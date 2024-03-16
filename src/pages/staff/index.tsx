import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffDashboard from "./dashboard";
import Classroom from "./Classroom";
import Test from "./Tests";
import AddProgramming from "./Tests/addProgramming";

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