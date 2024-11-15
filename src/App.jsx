import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from "./pages/Home";
import Users, {loader as usersLoader} from "./pages/Users";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import EditPlace from "./pages/EditPlace";
import Places from './pages/Places';
import CreateAccount from './pages/CreateAccount'
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {path: '/', element: <Home /> },
      {path: 'users', element: <Users />, loader: usersLoader},
      {path: 'login', element: <Login /> },
      {path: 'locais', element: <Places /> },
      {path: 'edituser/:userId', element: <EditUser /> },
      {path: 'editplace/:placeId', element: <EditPlace /> },
      {path: 'createaccount', element: <CreateAccount /> }
    ]
  }
]);

function App() {

  return ( 
      <RouterProvider router={router} />
  )
}

export default App
