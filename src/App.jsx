import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Padrões
import RootLayout from './pages/Root';
import Home from "./pages/Home";
import ErrorPage from './pages/Error';

//Users
import Users, {loader as usersLoader} from "./pages/Users";
import EditUser from "./pages/EditUser";
import CreateAccount from './pages/CreateAccount'
import Login from "./pages/Login";
import UserDetail, {
  loader as userDetailLoader,
  action as deleteUserAction
} from './pages/UserDetail';
import { action as authAction } from './pages/Login';
import { globalLoader, checkAuthLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';
import { action as manipulateUserAction } from './components/UserForm'; 

// Locais
import Places, {loader as placesLoader} from './pages/Places';
import EditPlace from "./pages/EditPlace";
import PlaceDetail, {
  loader as placeDetailLoader,
  action as placeAction
} from './pages/PlaceDetail';
import CreatePlace from './pages/CreatePlace';
import { action as manipulatePlaceAction } from './components/PlaceForm';
import MyPlaces, { loader as myPlacesLoader } from './pages/MyPlaces';

import {action as createReservationAction } from './components/ReservationForm';

import './App.css'
import CreateReservation from './pages/CreateReservation';
import PlaceReservations, {loader as placeReservationsLoader } from './pages/PlaceReservations';

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
          {path: 'new', element: <CreateAccount />, action: manipulateUserAction},
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
              {index: true, element: <PlaceDetail />, action: placeAction},
              {path: 'edit', element: <EditPlace />, loader: checkAuthLoader, action: manipulatePlaceAction},
              {path: 'newreservation', element: <CreateReservation />, action: createReservationAction},
              {path: 'reservations', element: <PlaceReservations />, loader: placeReservationsLoader}
            ]
          },
          {path: 'meuslocais', element: <MyPlaces />, loader: myPlacesLoader},
          {path: 'new', element: <CreatePlace />, loader: checkAuthLoader, action: manipulatePlaceAction},
        ] 
      },
      {path: 'logout', action: logoutAction},
    ]
  }
]);

function App() {

  return ( 
    <RouterProvider router={router} />
  )
}

export default App
