import { useState } from "react"
import Header from "../components/Header"
import DataTable from "react-data-table-component"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
const PatientList = () => {
  const { patients } = useSelector(v => v.patient);
  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Address",
      selector: row => row.address ? row.address : "N/A"
    },
    {
      name: "Phone",
      selector: row => row.phone.length < 11 ? `+92-${row.phone}` : 'N/A'
    },
    {
      name: "DOB",
      selector: row => row.dob ? row.dob.substring(0, 10) : 'N/A'
    }, {
      name: 'Action',
      cell: row => <>
        <div className="flex gap-2">
          <button className=" rounded-sm hover:text-purple-600 text-orange-500 text-3xl" onClick={() => hanldeNavigate(row)}><CiEdit /></button>
          <button className="rounded-sm hover:text-purple-600 text-red-600 text-3xl" onClick={() => hanldeNavigate(row)}><MdDelete /></button>
        </div>
      </>,
    },
  ]
  const data = patients;
  const hanldeNavigate = (e) => {
    console.log(e.id)
  }
  const customStyles = {
    rows: {
      style: {
        backgroundColor: '#f8f9fa', // Background color for rows
        color: '#343a40', // Text color for rows
        overFlow: 'hidden'
      },
    },
    headCells: {
      style: {
        backgroundColor: '#007bff', // Background color for header cells
        color: '#fff', // Text color for header cells
        fontWeight: 'bold',
        fontSize: '16px'
      },
    },
    cells: {
      style: {
        backgroundColor: '#e9ecef', // Background color for individual cells
        color: '#495057', // Text color for individual cells
      },
    },
  }
  const [records, setRecords] = useState(data);
  function handleFilter(e) {
    const newData = data.filter(v => v.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setRecords(newData);
  }
  return (
    <div>
      <Header></Header>
      <div className="flex justify-between px-12">
        <h1 className="font-serif">Patients List</h1>
        <div className="min-h-10">
          <input placeholder="Search here...." className=" border-black border focus:outline-none rounded px-4 py-1" type="text" onChange={handleFilter} name="" id="" />
        </div>
      </div>
      <div className="border px-2">
        <DataTable customStyles={customStyles} selectableRows columns={columns} data={records} fixedHeader pagination></DataTable>
      </div>
    </div>
  )
}

export default PatientList