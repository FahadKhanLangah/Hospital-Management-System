
import gynea from '../assets/gynea.png'
const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center justify-center my-2">
      <h1 className="text-2xl font-medium">Find Doctors By Speciality</h1>
      <p className='text-gray-400 py-2'>You can find the Doctor you need, by Speciality</p>
      <div className='flex justify-center items-center w-full gap-4'>
        <div className='flex cursor-pointer hover:scale-105 flex-col items-center justify-center'>
          <img className='w-20 rounded-full object-fill h-20' src={gynea} alt="" />
          <h1>Gyneacologist</h1>
        </div>
      </div>
    </div>
  )
}

export default SpecialityMenu