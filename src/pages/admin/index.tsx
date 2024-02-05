 /* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import AdminDashboard from "./dashboard";

function Admin() {
    return (
        <Routes>
            <Route path="dashboard" element={
                <Layout>
                    <AdminDashboard />
                </Layout>
            } />
        </Routes>
    );
};

export default Admin;