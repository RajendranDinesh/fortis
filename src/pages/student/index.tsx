import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import StudentDashboard from "./dashboard";
import Class from "./class";
import Test from './test';
import NotFoundPage from "../404";

function Student() {
    return (
        <Routes>
            <Route path="dashboard" element={
                <Layout>
                    <StudentDashboard />
                </Layout>} />

            <Route path="class/:classId" element={
                <Layout>
                    <Class />
                </Layout>} />

            <Route path="test/:testId" element={
                <Layout>
                    <Test />
                </Layout>} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Student;