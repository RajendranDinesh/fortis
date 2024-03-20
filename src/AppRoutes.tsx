 /* eslint-disable */
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";

import Questions from "./pages/questions";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Student from "./pages/student";
import Supervisor from "./pages/supervisor";
import Staff from "./pages/staff";
import NotFoundPage from "./pages/404";

// Add the route here if there is no need for user's identity
function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
        </Routes>
    );
};

// Add the route here for an authenticated user session

function ProtectedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>

                <Route path="admin" element={<Navigate to={"dashboard"} />} />
                <Route path="staff" element={<Navigate to={"dashboard"} />} />
                <Route path="student" element={<Navigate to={"dashboard"} />} />
                <Route path="supervisor" element={<Navigate to={"dashboard"} />} />
                
                <Route path="admin/*" element={<Admin />} />
                <Route path="staff/*" element={<Staff />} />
                <Route path="student/*" element={<Student />} />
                <Route path="supervisor/*" element={<Supervisor />} />

                <Route path="questions/:testId" element={<Questions />} />

                <Route path="logout" element={<Logout />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

function ProtectedRoute() {
    const result =  localStorage.getItem("authToken") !== null;

    return (result ? <Outlet /> : <Navigate to="/login" />);
};

function Logout() {
    localStorage.removeItem("authToken");
    return <Navigate to="/login" />;
}

export { AppRoutes, ProtectedRoutes };
