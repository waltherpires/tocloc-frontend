import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  
import Header from './components/Header';

import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import EditPlace from "./pages/EditPlace";
import Places from './pages/Places';
import CreateAccount from './pages/CreateAccount'

export default function MyRoutes() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="users" element={<Users />} />
                <Route path="login" element={<Login />} />
                <Route path="locais" element={<Places />} /> 
                <Route path="edituser/:userId" element={<EditUser />} />
                <Route path="editplace/:placeId" element={<EditPlace />} />
                <Route path="createaccount" element={<CreateAccount />} />
            </Routes>
        </Router>
    )
}