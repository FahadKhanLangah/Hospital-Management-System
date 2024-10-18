import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/add-doctor',
    element: <AddDoctor></AddDoctor>
  },
  {
    path: '/doctor-list',
    element: <DoctorList></DoctorList>
  },
  {
    path: '/patient-list',
    element: <PatientList></PatientList>
  }
]);
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login';
import Register from './pages/Register';
import AddDoctor from './pages/AddDoctor';
import DoctorList from './pages/DoctorList';
import PatientList from './pages/PatientList';
function App() {

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
