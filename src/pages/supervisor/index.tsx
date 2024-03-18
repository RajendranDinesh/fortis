import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupervisorDashboard from "./dashboard";
import StudentDetailsPage from "./StudentDetails";
import NotFoundPage from "../404";

function Supervisor() {
    return (
        <Routes>
            <Route path="dashboard" element={<SupervisorDashboard />} />
            <Route path= "StudentDetailsPage/:id" element ={<StudentDetailsPage/>}/>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Supervisor;