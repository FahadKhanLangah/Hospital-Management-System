import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserEdit } from "react-icons/fa";
import { toast } from 'react-toastify'
import { getloginUserDetail, updateUser } from '../Redux/Actions/userAction';
const MyProfile = () => {
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [avatarPrev, setAvatarPrev] = useState(null);
  const [avatar, setAvatar] = useState();
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarPrev(URL.createObjectURL(file));
    setAvatar(avatar);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result)
      }
      reader.onerror = () => {
        toast("Invalid File")
      }
    }
  }
  const dispatch = useDispatch();
  const { message, error } = useSelector(v => v.update);
  useEffect(() => {
    if (message) {
      toast(message);
      setEditToggle(false);
      dispatch(getloginUserDetail());
    }
    if (error) {
      toast.error(error)
    }
  }, [error, message, dispatch])
  const handleUpdate = () => {
    const formdata = new FormData();
    if (name) formdata.append("name", name);
    if (address) formdata.append("address", address);
    if (dob) formdata.append("dob", dob);
    // if (avatar) formdata.append("avatar", avatar);
    if (avatar) {
      toast.message("This feature will be added soon");
    }
    if (gender) formdata.append("gender", gender);
    dispatch(updateUser(formdata))
  }
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  }
  const { user } = useSelector(v => v.user);
  const clearInput = () => {
    setAddress("");
    setAvatarPrev(null);
    setDob("");
    setGender("");
    setName("");
  }
  // const [age, setAge] = useState();
  // function calculateAge() {
  //   let currentDate = new Date();
  //   let birthDate = new Date(dob);
  //   let age = currentDate.getFullYear() - birthDate.getFullYear();
  //   let monthDifference = currentDate.getMonth() - birthDate.getMonth();
  //   if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   setAge(age);
  // }

  return (
    <div>
      <h1 className='text-2xl font-bold'>My Profile</h1>
      <hr className='my-2' />
      <div className='flex justify-between gap-6'>
        <div className='w-[40%] relative'>
          <img className='w-44 rounded' src={avatarPrev ? avatarPrev : user?.profilePic?.url} alt="" />
          {editToggle ?
            <span className='absolute bottom-0 sm:right-40 hover:text-orange-500 cursor-pointer right-0 text-2xl'>
              <FaUserEdit onClick={handleClick} />
              <input onChange={(e) => handleAvatarChange(e)} ref={fileInputRef} className='hidden' type="file" />
            </span> : null}
        </div>
        <div className='w-[50%]'>
          <h1 className='text-xl font-bold my-2 uppercase text-gray-600'>{user?.gender === "male" ? " Mr. " : "Miss. "}{user?.name}</h1>
          <hr className='my-2' />
          <div className='flex sm:flex-row flex-col w-[80%] overflow-hidden'>
            <h1 className='text-lg font-semibold w-[40%]'>Gender</h1>
            <p className='text-gray-700'>{user?.gender}</p>
          </div>
          <div className='flex sm:flex-row flex-col w-[80%] overflow-hidden'>
            <h1 className='text-lg font-semibold w-[40%]'>Phone</h1>
            <p className='text-gray-700 '>{user?.phone}</p>
          </div>
          <hr className='my-2' />
          <div className='flex sm:flex-row flex-col w-[80%] overflow-hidden'>
            <h1 className='text-lg font-semibold w-[40%]'>Address</h1>
            <p className='text-gray-700 font-medium'>{user.address ? user.address : "Please add your address"}</p>
          </div>
          <div className='flex sm:flex-row flex-col w-[80%] overflow-hidden'>
            <h1 className='text-lg font-semibold w-[40%]'>DOB :</h1>
            <p className='text-gray-700 font-medium'>{user.dob ? String(user.dob).substring(0, 10) : "Please add your DOB"}</p>
          </div>
        </div>
      </div>
      <hr className='mt-5' />
      <div className='py-1'>
        <h1 className='text-lg text-gray-700 font-semibold py-3'>
          Add Some More Info <p className='text-gray-500 font-normal'>(Only fill fields you want to change)</p>
        </h1>
        {
          editToggle ? <div className='flex flex-wrap sm:flex-row flex-col justify-between'>
            <div className='sm:w-[40%] gap-1 flex flex-col my-2'>
              <h1 className='text-xl font-semibold pl-2'>New Name</h1>
              <input value={name} onChange={e => setName(e.target.value)} className='bg-transparent px-2 border-black border rounded font-mono py-1' type="text" placeholder='New Name ....' />
            </div>
            <div className='sm:w-[40%] gap-1 flex flex-col my-2'>
              <h1 className='text-xl font-semibold pl-2'>Your Address</h1>
              <input value={address} onChange={e => setAddress(e.target.value)} className='bg-transparent px-2 border-black border rounded font-mono py-1' type="text" placeholder='street xyz, city name, district...' />
            </div>
            <div className='sm:w-[40%] gap-1 flex flex-col my-2'>
              <h1 className='text-xl font-semibold pl-2'>Gender</h1>
              <div className='flex gap-8'>
                <div className='flex gap-4'>
                  <span className='font-bold'>Male</span>
                  <input type='radio' name='gender' value="male" onChange={e => setGender(e.target.value)} />
                </div>
                <div className='flex gap-4'>
                  <span className='font-bold'>Female</span>
                  <input type='radio' name='gender' value="female" onChange={e => setGender(e.target.value)} />
                </div>
              </div>
            </div>
            <div className='flex flex-col sm:w-[40%] gap-1 my-2'>
              <h1 className='text-xl font-semibold pl-2'>DOB</h1>
              <input value={dob} onChange={e => setDob(e.target.value)} className='bg-transparent px-2 py-1 border-black border rounded font-semibold' type="date" />
              <div className='flex gap-2 my-3 justify-end'>
                <button onClick={clearInput} className='hover:bg-green-600 bg-transparent text-black rounded-sm hover:border-none text-md'>Clear</button>
                <button onClick={handleUpdate} className='hover:bg-orange-600 rounded-sm hover:border-none text-sm'>Update</button>
              </div>
            </div>
          </div> :
            <button onClick={() => setEditToggle(true)}>Edit Profile</button>
        }

      </div>
    </div>
  )
}

export default MyProfile