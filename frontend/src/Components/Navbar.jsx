import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import testImg from '../assets/test.png'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../Redux/Actions/userAction";

const Navbar = () => {
  const [tab, setTab] = useState("home");
  const navigate = useNavigate();
  const { user } = useSelector(v => v.user);
  const [token, setToken] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.name) {
      setToken(true)
    }
  }, [user]);
  // useEffect(() => {
  //   dispatch(getloginUserDetail());
  // }, [dispatch]);
  const { error, message } = useSelector(v => v.user);
  useEffect(() => {
    if (error) {
      toast(error)
    }
    if (message) {
      toast(message)
      setToken(false)
    }
  }, [error, message])
  const handleLogout = () => {
    dispatch(logoutUser());
  }
  return (

    <div className="sm:py-4 py-2 mb-3">
      <div className="flex sm:flex-row flex-col sm:justify-between mb-2">
        <div className="items-center flex justify-center">
          <h1 className="uppercase text-xl sm:text-2xl font-bold italic">HM Hospital</h1>
        </div>
        <div className="min-w-[50%] flex justify-between">
          <div className="list-none flex items-start gap-3 sm:gap-5 sm:font-medium">
            <Link to={'/'}>
              <li className="py-1" onClick={() => setTab("home")}>Home</li>
              {tab == "home" ? <hr className="outline-none h-0.5 bg-blue-600 border-none w-3/5 m-auto" /> : null}
            </Link>
            <Link to={'/doctors'}>
              <li className="py-1" onClick={() => setTab("doctor")}>Doctors</li>
              {tab == "doctor" ? <hr className="outline-none h-0.5 bg-blue-600 border-none w-3/5 m-auto" /> : null}
            </Link>
            <Link to={'/about'}>
              <li className="py-1" onClick={() => setTab("about")}>About</li>
              {tab == "about" ? <hr className="outline-none h-0.5 bg-blue-600 border-none w-3/5 m-auto" /> : null}
            </Link>
            <Link to={'/contact'}>
              <li className="py-1" onClick={() => setTab("contact")}>Contact</li>
              {tab == "contact" ? <hr className="outline-none h-0.5 bg-blue-600 border-none w-3/5 m-auto" /> : null}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {token ?
              <div className="relative group cursor-pointer">
                <img className="sm:w-12 w-8 h-8 sm:h-12 object-cover rounded-full" src={user?.profilePic?.url || testImg} alt="" />
                <div className="z-20 absolute top-0 right-0 mt-12 text-base hidden duration-700 group-hover:block">
                  <div className="min-w-48 mt-4 rounded-sm  bg-slate-300 p-4 flex flex-col gap-4">
                    <p onClick={() => navigate('/my-profile')} className="hover:font-bold hover:text-black">My Profile</p>
                    <p onClick={() => navigate('/my-appointments')} className="hover:font-bold hover:text-black">My Appointments</p>
                    <p onClick={handleLogout} className="hover:font-bold hover:text-black">Logout</p>
                  </div>
                </div>
              </div> : <button onClick={() => navigate('/login')}>CREATE ACOUNT</button>}
          </div>
        </div>
      </div>
      <hr className="bg-black h-1 rounded-full" />
    </div>
  )
}

export default Navbar