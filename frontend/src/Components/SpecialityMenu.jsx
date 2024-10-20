import { useState } from "react"

const SpecialityMenu = () => {
  const [searchFilter, setSearchFilter] = useState('');
  return (
    <div className="flex flex-col items-center font-semibold justify-center my-3">
      <h1 className="text-2xl font-medium">Find Doctors By Speciality</h1>
      {/* <p className='text-gray-400 mb-4 mt-2'>You can find the Doctor you need, by Speciality</p> */}
      <div className='flex justify-center sm:text-lg flex-wrap my-2 items-center w-full gap-5 sm:gap-8'>
        <div onClick={() => setSearchFilter("gyneacologist")} className='flex cursor-pointer hover:scale-105 flex-col items-center justify-center'>
          <img className='w-16 rounded-full h-16' src="https://images.herzindagi.info/image/2021/Mar/gynae-checks-main.jpg" alt="" />
          <h1>Gyneacologist</h1>
        </div>
        <div onClick={() => setSearchFilter("surgeon")} className='flex cursor-pointer hover:scale-105 flex-col items-center justify-center'>
          <img className='w-16 rounded-full h-16' src="https://oaidocs.com/wp-content/uploads/2019/04/iStock-913784822.jpg" alt="" />
          <h1>Surgeon</h1>
        </div>
        <div onClick={() => setSearchFilter("dentist")} className='flex cursor-pointer hover:scale-105 flex-col items-center justify-center'>
          <img className='w-16 rounded-full h-16' src="https://www.pinnacledentalgroupmi.com/wp-content/uploads/2023/11/general-dentistry-img.jpeg" alt="" />
          <h1>Dentist</h1>
        </div>
        <div onClick={() => setSearchFilter("orthopaedic")} className='flex cursor-pointer hover:scale-105 flex-col items-center justify-center'>
          <img className='w-16 rounded-full h-16' src="https://enshrinehealthcaresystems.com/img/products/112b7f29-a719-4e72-8d57-987556260be6.jpg" alt="" />
          <h1>Orthopaedic</h1>
        </div>
        <div onClick={() => setSearchFilter("physician")} className='flex cursor-pointer hover:scale-105 flex-col items-center justify-center'>
          <img className='w-16 rounded-full h-16' src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/08/doctor-and-pa.jpeg.jpg" alt="" />
          <h1>Physician</h1>
        </div>
      </div>
    </div>
  )
}

export default SpecialityMenu