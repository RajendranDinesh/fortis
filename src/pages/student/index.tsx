import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import StudentDashboard from "./dashboard";
import Class from "./class";
import Test from './test';

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
        </Routes>
    );
};

export default Student;