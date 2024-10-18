import { CiBank } from "react-icons/ci";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiBankCardFill } from "react-icons/ri";
const PaymentBoard = () => {
  return (
    <div>
      <h2>PaymentBoard</h2>
      <div className="flex justify-between flex-wrap">
        <div className="h-48 w-96 my-2 relative bg-blue-500 text-white rounded flex justify-center">
          <h1 className="text-center">Total Earning</h1>
          <div className="w-[98%] cursor-pointer h-[80%] bottom-1 flex justify-center items-center absolute bg-white">
            <span className="text-7xl justify-center items-center hover:text-blue-500 flex flex-col text-black">
              <FaMoneyCheckAlt />
              <h1>Rs 55000+</h1>
            </span>
          </div>
        </div>
        <div className="h-48 w-96 my-2 relative bg-yellow-500 text-white rounded flex justify-center">
          <h1 className="text-center">Total Expenses</h1>
          <div className="w-[98%] cursor-pointer h-[80%] bottom-1 flex justify-center items-center absolute bg-white">
            <span className="text-7xl justify-center items-center hover:text-yellow-600 flex flex-col text-black">
              <RiBankCardFill />
              <h1>Rs 45000+</h1>
            </span>
          </div>
        </div>
        <div className="h-48 w-96 my-2 relative bg-gray-500 text-white rounded flex justify-center">
          <h1 className="text-center">Net Profit</h1>
          <div className="w-[98%] cursor-pointer h-[80%] bottom-1 flex justify-center items-center absolute bg-white">
            <span className="text-7xl hover:text-gray-600 flex flex-col justify-center items-center text-black">
              <CiBank />
              <h1>Rs 1000</h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentBoard