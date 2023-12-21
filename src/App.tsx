import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from './pages/editor';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Editor />} />
      </Routes>
    </Router>
  );
}