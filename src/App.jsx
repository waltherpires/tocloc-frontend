import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from "./pages/Home";
import Users, {loader as usersLoader} from "./pages/Users";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import EditPlace from "./pages/EditPlace";
import Places, {loader as placesLoader} from './pages/Places';
import CreateAccount from './pages/CreateAccount'
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import UserDetail, {loader as userDetailLoader} from './pages/UserDetail';
import PlaceDetail, {loader as placeDetailLoader} from './pages/PlaceDetail';

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home /> },
      {
        path: 'users',
        children: [
          {index: true, element: <Users />, loader: usersLoader},
          {
            path: ':userId',
            loader: userDetailLoader,
            id: "user-detail",
            children: [
              {index: true, element: <UserDetail />},
              {path: 'edit', element: <EditUser />},
            ]
          },
        ]
      },
      {path: 'login', element: <Login /> },
      {
        path: 'locais',
        children: [
          {index: true, element: <Places />, loader: placesLoader},
          {
            path: ":placeId",
            id: "place-detail",
            loader: placeDetailLoader,
            children: [
              {index: true, element: <PlaceDetail />},
              {path: 'edit', element: <EditPlace />}
            ]
          }
        ] 
      },
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
