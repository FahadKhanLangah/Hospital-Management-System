import { useEffect } from "react";
import Header from "../components/Header"
import DashBoard from "../utils/DashBoard"
import PaymentBoard from "../utils/PaymentBoard"
import { ReactTyped } from 'react-typed';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessages, getAllAppointments, getAllDoctors, getAllPatients } from "../Redux/Actions/adminAction";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useMemo } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector(v => v.doctor);
  const { patients } = useSelector(v => v.patient);
  const { admin } = useSelector(v => v.admin);
  const { appointments, error } = useSelector(v => v.appointment)
  const shouldFetchDoctors = useMemo(() => !doctors.length, [doctors.length]);
  const shouldFetchPatients = useMemo(() => !patients.length, [patients.length]);
  const shouldFetchAppointments = useMemo(() => !appointments.length, [appointments.length]);

  useEffect(() => {
    if (shouldFetchDoctors) {
      dispatch(getAllDoctors());  
    }
    if (shouldFetchPatients) {
      dispatch(getAllPatients()); 
    }
    if (shouldFetchAppointments) {
      dispatch(getAllAppointments()); 
    }

    if (error) {
      toast.error(error);
    }

    return () => {
      dispatch(clearMessages()); 
      dispatch(clearErrors());   
    };
  }, [dispatch, shouldFetchDoctors, shouldFetchPatients, shouldFetchAppointments, error]); // Removed doctors, patients, and appointments from the dependency array

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