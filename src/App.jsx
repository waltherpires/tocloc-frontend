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
import UserDetail, {
  loader as userDetailLoader,
  action as deleteUserAction
} from './pages/UserDetail';
import PlaceDetail, {
  loader as placeDetailLoader,
  action as deletePlaceAction
} from './pages/PlaceDetail';
import { action as manipulateUserAction } from './components/UserForm'; 
import { action as authAction } from './pages/Login';
import { globalLoader, checkAuthLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: globalLoader,
    children: [
      {index: true, element: <Home /> },
      {
        path: 'users',
        children: [
          {index: true, element: <Users />, loader: usersLoader},
          {
            path: ':userId',
            id: "user-detail",
            loader: userDetailLoader,
            children: [
              {index: true, element: <UserDetail />, action: deleteUserAction},
              {path: 'edit', element: <EditUser />, loader: checkAuthLoader, action: manipulateUserAction},
            ]
          },
          {path: 'new', element: <CreateAccount />, action: manipulateUserAction}
        ]
      },
      {path: 'login', element: <Login />, action: authAction },
      {
        path: 'locais',
        children: [
          {index: true, element: <Places />, loader: placesLoader},
          {
            path: ":placeId",
            id: "place-detail",
            loader: placeDetailLoader,
            children: [
              {index: true, element: <PlaceDetail />, action: deletePlaceAction},
              {path: 'edit', element: <EditPlace />}
            ]
          }
        ] 
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ]
  }
]);

function App() {

  return ( 
      <RouterProvider router={router} />
  )
}

export default App
