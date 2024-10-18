import { useEffect } from "react";
import Header from "../components/Header"
import DashBoard from "../utils/DashBoard"
import PaymentBoard from "../utils/PaymentBoard"
import { ReactTyped } from 'react-typed';
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, getAllPatients } from "../Redux/Actions/adminAction";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector(v => v.doctor);
  const { patients } = useSelector(v => v.patient);
  const { admin } = useSelector(v => v.admin);
  useEffect(() => {
    if (!doctors.length) {
      dispatch(getAllDoctors());  // Fetch doctors only if not already present
    }
    if (!patients.length) {
      dispatch(getAllPatients()); // Fetch patients only if not already present
    }
  }, [dispatch, doctors, patients])
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate('/login')
    }
  }, [navigate, admin]);
  const data = [
    "Welcome Sir!",
    "Manage Your Dashboard"
  ]
  return (
    <>
      <Header></Header>
      <div className="m-3">
        <div className="my-4">
          <h3 className="text-center font-semibold text-4xl">
            <ReactTyped backDelay={500} strings={data} typeSpeed={250} backSpeed={20} loop></ReactTyped>
          </h3>
        </div>
        <DashBoard></DashBoard>
        <hr />
        <PaymentBoard></PaymentBoard>
      </div>
    </>
  )
}

export default Home