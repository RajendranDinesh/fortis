import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffDashboard from "./dashboard";
import Classroom from "./Classroom";
// import Test from "./Test";
// import AddProgramming from "./Test/Add Programming";

function Staff() {
    return (
        <Routes>
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="classroom/:id" element={<Classroom />} />
            {/* <Route path="test" element={<Test />} /> */}
            {/* <Route path="test/programming" element={<AddProgramming />} /> */}
        </Routes>
    );
};

export default Staff;