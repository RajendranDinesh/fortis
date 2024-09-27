/* eslint-disable */
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

const Questions = lazy(() => import("./pages/questions"));
const Login = lazy(() => import("./pages/login"));
const Admin = lazy(() => import("./pages/admin"));
const Student = lazy(() => import("./pages/student"));
const Supervisor = lazy(() => import("./pages/supervisor"));
const Staff = lazy(() => import("./pages/staff"));
const Users = lazy(() => import("./pages/users"));
const NotFoundPage = lazy(() => import("./pages/404"));

// Add the route here if there is no need for user's identity
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="/login"
                element={
                    <Suspense fallback={<>Loading</>}>
                        <Login />
                    </Suspense>
                } />
            <Route path="/404" element={<NotFoundPage />} />
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
                <Route path="users" element={<Navigate to={"profile"} />} />

                <Route path="admin/*"
                    element={
                        <Suspense fallback={<>Loading</>}>
                            <Admin />
                        </Suspense>
                    } />
                <Route path="staff/*"
                    element={
                        <Suspense fallback={<>Loading</>}>
                            <Staff />
                        </Suspense>
                    } />
                <Route path="student/*"
                    element={
                        <Suspense fallback={<>Loading</>}>
                            <Student />
                        </Suspense>
                    } />
                <Route path="supervisor/*"
                    element={
                        <Suspense fallback={<>Loading</>}>
                            <Supervisor />
                        </Suspense>
                    } />
                <Route path="users/*"
                    element={
                        <Suspense fallback={<>Loading</>}>
                            <Users />
                        </Suspense>
                    } />
                <Route path="questions/:classroomTestId"
                    element={
                        <Suspense fallback={<>Loading</>}>
                            <Questions />
                        </Suspense>
                    } />

                <Route path="logout" element={<Logout />} />

                <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
        </Routes>
    );
}

function ProtectedRoute() {
    const result = localStorage.getItem("authToken") !== null;

    return (result ? <Outlet /> : <Navigate to="/login" />);
};

function Logout() {
    localStorage.removeItem("authToken");
    return <Navigate to="/login" />;
}

export { AppRoutes, ProtectedRoutes };
