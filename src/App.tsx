import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Editor from './pages/editor';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Editor />} />
      </Routes>
    </Router>
  );
}