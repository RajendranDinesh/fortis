//dependencies

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profiles from './components/profilePage';

//styles

//components

//assets

function Users() {
    return (
        <Routes>
            <Route path='profile' element={<Profiles />} />
        </Routes>
    );
};

export default Users