import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  
import Home from "./pages/Home";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import Header from './components/Header';

export default function MyRoutes() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="edit/:userId" element={<EditUser />} />
            </Routes>
        </Router>
    )
}