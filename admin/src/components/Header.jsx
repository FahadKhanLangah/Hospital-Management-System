import { MdOutlineCancel } from "react-icons/md";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import Navbar from "./Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  // const navigate = useNavigate();
  // const [activeOpt, setActiveOpt] = useState("");
  return (
    <div className="mb-3 text-white h-16 bg-blue-600 flex items-center relative">
      <div className="flex gap-1 w-full p-1 sm:p-4">
        <div className="sm:w-[50%] w-[30%] text-xl sm:text-3xl">HMS_ADMIN</div>
        <div className="flex sm:gap-8 gap-2 sm:w-[40%] list-none cursor-pointer text-sm pt-1 sm:text-lg">
          <Link to={'/'}><li className="duration-700 hover:text-orange-600">Home</li></Link>
          <Link to={'/add-doctor'}><li className="duration-700 hover:text-orange-600">Add_Doctor</li></Link>
          <li className="duration-700 hover:text-orange-600">Update</li>
          <li className="duration-700 hover:text-orange-600">About</li>
        </div>
        <div className="flex justify-end w-[15%] sm:w-[10%]">
          {showNavbar ?
            <span onClick={() => setShowNavbar(false)} className="text-4xl cursor-pointer hover:text-orange-500">
              <MdOutlineCancel />
            </span> :
            <span onClick={() => setShowNavbar(true)} className="text-4xl cursor-pointer hover:text-orange-500">
              <IoEllipsisVerticalOutline />
            </span>}
        </div>
      </div>
      {showNavbar ? <div className="absolute w-60 z-30 transition-transform duration-700 ease-in-out top-16 bg-blue-600 h-[700px] transform translate-x-0">
        <Navbar />
      </div>
        :
        <div className="absolute w-60 z-30 transition-transform duration-700 ease-in-out top-16 bg-blue-600 h-[700px] transform -translate-x-full">
          <Navbar />
        </div>
      }
    </div>
  )
}

export default Header