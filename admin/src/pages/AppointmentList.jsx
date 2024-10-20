import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Header from "../components/Header";
import DataTable from "react-data-table-component";
import { useSelector } from 'react-redux';

const AppointmentList = () => {
  const { appointments } = useSelector(v => v.appointment)
  const data = appointments;
  const columns = [
    {
      name: "Patient",
      selector: row => row.patient.name,
      sortable: true
    },
    {
      name: "Doctor",
      selector: row => row.doctor.name
    },
    {
      name: "Date",
      selector: row => row.bookedDate.date.weekday ? row.bookedDate.date.dayNumber : 'N/A',
      sortable: true
    },
    {
      name: "Time",
      selector: row => !row.cancel ? row.bookedDate.time : 'cancelled',
      sortable: true
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
  const hanldeNavigate = (e) => {
    console.log(e.id)
  }
  const customStyles = {
    rows: {
      style: {
        backgroundColor: '#f8f9fa', // Background color for rows
        color: '#343a40', // Text color for rows
        overFlow: 'hidden',
        fontWeight: 'bold'
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
    const newData = data.filter(v => v.patient.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setRecords(newData);
  }
  return (
    <div>
      <Header></Header>
      <div className="flex justify-between px-12">
        <h1 className="font-serif">Appointment List</h1>
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

export default AppointmentList