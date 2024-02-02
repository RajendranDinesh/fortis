 /* eslint-disable */
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";

import Editor from "./pages/editor";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Student from "./pages/student";
import Supervisor from "./pages/supervisor";
import Staff from "./pages/staff";

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

                <Route path="editor" element={<Editor />} />
            </Route>
        </Routes>
    );
}

function ProtectedRoute() {
    const result =  localStorage.getItem("authToken") !== null;

    return (result ? <Outlet /> : <Navigate to="/login" />);
};

export { AppRoutes, ProtectedRoutes };
