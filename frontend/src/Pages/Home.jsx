import AppointmentBanner from "../Components/AppointmentBanner"
import Header from "../Components/Header"
import SpecialityMenu from "../Components/SpecialityMenu"
import TopDoctors from "../Components/TopDoctors"


const Home = () => {
  return (
    <div>
      <Header></Header>
      <hr className="my-4" />
      <SpecialityMenu></SpecialityMenu>
      <hr className="mt-8" />
      <TopDoctors></TopDoctors>
      <hr className="my-6" />
      <AppointmentBanner></AppointmentBanner>
    </div>
  )
}

export default Home