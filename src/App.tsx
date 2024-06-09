import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

import { AppRoutes, ProtectedRoutes } from './AppRoutes';

export default function App() {
  return (
    <Router>
      <AppRoutes />
      <ProtectedRoutes />
    </Router>
  );
}