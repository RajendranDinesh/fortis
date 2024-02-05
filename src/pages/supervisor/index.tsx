import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupervisorDashboard from "./dashboard";
import StudentDetailsPage from "./StudentDetails";

function Supervisor() {
    return (
        <Routes>
            <Route path="dashboard" element={<SupervisorDashboard />} />
            <Route path= "StudentDetailsPage" element ={<StudentDetailsPage/>}/>
        </Routes>
    );
};

export default Supervisor;