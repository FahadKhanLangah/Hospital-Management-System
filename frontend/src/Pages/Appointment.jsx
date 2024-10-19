import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import { makeAppointment } from "../Redux/Actions/userAction";
const Appointment = () => {
  const { doctors } = useSelector(v => v.doctors);
  const { docId } = useParams();
  const doctor = doctors.find(v => v._id === docId);

  // Date Logic
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedDate, setBookedTime] = useState();

  // Get next 7 days
  useEffect(() => {
    const getNext7Days = () => {
      const daysArr = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const day = {
          dayNumber: nextDay.getDate(), // Day number (e.g., 02)
          weekday: nextDay.toLocaleString('en-US', { weekday: 'short' }) // Weekday name (e.g., Mon)
        };
        daysArr.push(day);
      }
      return daysArr;
    };

    setDays(getNext7Days());
  }, []);

  // Generate time slots between 10AM and 6PM
  const generateTimeSlots = (selectedDay) => {
    const slots = [];
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentDate = currentTime.getDate();
    const selectedDate = new Date();
    selectedDate.setDate(selectedDay.dayNumber);

    // If today is the selected day
    if (currentDate === selectedDay.dayNumber) {
      // Check if it's past 6PM (18:00)
      if (currentHour >= 18) {
        return ['No available slots for today'];
      }

      // Show available time slots for today from the next available hour until 6PM
      for (let i = currentHour + 1; i <= 18; i++) {
        const time = i < 12 ? `${i}:00 AM` : `${i === 12 ? 12 : i - 12}:00 PM`;
        slots.push(time);
      }
    } else {
      // If a future day is selected, show full range from 10AM to 6PM
      for (let i = 10; i <= 18; i++) {
        const time = i < 12 ? `${i}:00 AM` : `${i === 12 ? 12 : i - 12}:00 PM`;
        slots.push(time);
      }
    }

    return slots;
  };


  const handleDaySelect = (day) => {
    setSelectedDay(day);
    const generatedSlots = generateTimeSlots(day);
    setTimeSlots(generatedSlots);
  };

  // Code with error
  // const generateTimeSlots = () => {
  //   const slots = [];
  //   const currentTime = new Date();
  //   let currentHour = currentTime.getHours()
  //   const currentDate = currentTime.getDate()
  //   if (currentDate === selectedDay.dayNumber) {
  //     for (let i = currentHour + 1; i <= 18; i++) {
  //       const time = i < 12 ? `${i}:00 AM` : `${i === 12 ? 12 : i - 12}:00 PM`;
  //       slots.push(time);
  //     }
  //   } else {
  //     // Otherwise, show slots from 10AM to 6PM
  //     for (let i = 10; i <= 18; i++) {
  //       const time = i < 12 ? `${i}:00 AM` : `${i === 12 ? 12 : i - 12}:00 PM`;
  //       slots.push(time);
  //     }
  //   }
  //   return slots;
  // };

  // const handleDaySelect = (day) => {
  //   setSelectedDay(day);
  //   setTimeSlots(generateTimeSlots());
  // };

  const handleDate = (time) => {
    const bookDate = {
      time,
      date: selectedDay
    }
    setBookedTime(bookDate);
  }
  const { loading, isSuccess, message, error } = useSelector(a => a.appointment);
  useEffect(() => {
    if (loading) {
      toast.dark("Please wait")
    }
    if (isSuccess) {
      toast.success("Appointment Register successFully")
    } if (message) {
      toast.success(message)
    } if (error) {
      toast.error(error)
    }
  }, [error, message, isSuccess, loading, dispatch])
  const dispatch = useDispatch()
  const handleSubmit = () => {
    const formdata = {
      doctor: docId,
      date: bookedDate
    };
    dispatch(makeAppointment(formdata));
  }
  return (
    <div className="sm:flex">
      <div className="sm:w-1/2 flex sm:flex-col gap-6 sm:gap-2 w-full p-4">
        <div className="w-[40%] mt-2">
          <img className="sm:w-44 mt-1 w-40 rounded-sm" src={doctor?.avatar?.url} alt="" />
          <h1 className="text-center mt-2 font-semibold">{doctor?.name}</h1>
        </div>
        <div className="my-1 w-44 p-2">
          <hr className="h-4 bg-blue-600 rounded-sm" />
          <b className="text-gray-600">{doctor?.speciality}</b>
          <h1 className="font-normal">{doctor?.about}</h1>
          <strong>{doctor?.phone.length < 11 ? "+92 - " : ""}{doctor?.phone}</strong>
        </div>
      </div>
      <div className="sm:w-1/2 w-full my-4">
        <b>Book Appointment</b>
        <div className="flex flex-wrap gap-4">
          {days.map((day, index) => (
            <div
              key={index}
              className={`bg-blue-500 text-white w-28 p-2 cursor-pointer ${selectedDay?.dayNumber === day.dayNumber ? 'bg-blue-700' : ''}`}
              onClick={() => handleDaySelect(day)}
            >
              <div className="flex gap-2 font-bold justify-center items-center">
                <h1>{day.dayNumber}</h1>
                <p>{day.weekday}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedDay && (
          <div className="mt-4">
            <h2>Available Time Slots for {selectedDay.weekday}, {selectedDay.dayNumber}</h2>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map((time, index) => (
                <div onClick={() => handleDate(time, index)} key={index}
                  className={` cursor-pointer p-2 text-center rounded-lg ${bookedDate?.time === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {time}
                </div>
              ))}
            </div>
          </div>
        )}
        {
          bookedDate && (
            <div className="flex flex-col gap-2">
              <br />
              <b>After confirmation</b>
              <p>Your Appointment with <b>{doctor.name}</b> will be booked on <strong> {bookedDate?.date?.dayNumber}, {bookedDate?.date?.weekday} at {bookedDate?.time}</strong>
              </p>
              <button onClick={handleSubmit} className=" px-4 py-2 hover:bg-blue-700 rounded-sm bg-blue-600">Confirm</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Appointment