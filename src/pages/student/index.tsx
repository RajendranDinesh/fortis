import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import StudentDashboard from "./dashboard";
import Class from "./class";
import Test from './test/mcq';
import ProgrammingAnswer from "./test/programming";
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
    
            <Route path="mcq/:testId" element={
                <Layout>
                    <Test />
                </Layout>} />

            <Route path="programming/:testId" element={
                <Layout>
                    <ProgrammingAnswer />
                </Layout>} />
            
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Student;