import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  
import Home from "./pages/Home";
import Header from './components/Header'

export default function MyRoutes() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}