import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home';
import Login from './Pages/Login';
import Doctor from './Pages/Doctor';
import MyProfile from "./Pages/MyProfile";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import MyAppointments from "./Pages/MyAppointments";
import Appointment from "./Pages/Appointment";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
function App() {

  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:speciality" element={<Doctor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-acount" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
