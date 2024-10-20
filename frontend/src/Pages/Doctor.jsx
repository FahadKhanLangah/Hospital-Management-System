import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Doctor = () => {
  const { doctors, error } = useSelector(v => v.doctors);
  const [searchedDoctor, setSearchedDoctor] = useState(doctors || []);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [error]);
  useEffect(() => {
    if (searchTerm) {
      setSearchedDoctor(doctors.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setSearchedDoctor(doctors);
    }
  }, [searchTerm, doctors]);
  const navigate = useNavigate()
  const handleSearch = (search) => {
    console.log(search)
    setSearchTerm(search);
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">
          All Doctors
        </h1>
        <input value={searchTerm} onChange={e => handleSearch(e.target.value)} className="border-2 border-gray-500 focus:outline-none px-5 py-1 rounded-l-full rounded-r-full" placeholder="Search Doctor Name..." type="text" name="" id="" />
      </div>
      <div className='grid grid-cols-2 my-4 sm:grid-cols-5 place-items-center justify-items-center gap-4'>
        {searchedDoctor && searchedDoctor.length > 0 ? (
          searchedDoctor.map((v, i) =>
            <div
              onClick={() => navigate(`/appointment/${v._id}`)}
              key={i}
              className='w-36 relative h-56 bg-gray-300 hover:-translate-y-2 flex justify-center items-center flex-col border cursor-pointer rounded'
            >
              <img className='w-32 rounded absolute top-2' src={v.avatar?.url} alt="" />
              <div className='p-1 mt-36 flex flex-col'>
                <div className='flex justify-start items-center gap-3 text-green-600 font-medium'>
                  <p className='w-2 h-2 bg-green-600 rounded-full'></p>
                  <p>Available</p>
                </div>
                <h1 className='font-bold text-md'>{v.name}</h1>
                <p className='text-gray-600'>{v.speciality}</p>
              </div>
            </div>
          )
        ) : (
          <p className="text-2xl text-red-600">No doctor found</p>
        )}
      </div>
    </div>
  )
}

export default Doctor