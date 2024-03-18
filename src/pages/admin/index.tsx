 /* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import AdminDashboard from "./dashboard";
import NotFoundPage from "../404";

function Admin() {
    return (
        <Routes>
            <Route path="dashboard" element={
                <Layout>
                    <AdminDashboard />
                </Layout>
            } />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Admin;