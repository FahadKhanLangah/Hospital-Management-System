import { useState } from "react";
import Header from "../components/Header"
import DataTable from 'react-data-table-component';
import { useSelector } from "react-redux";
const DoctorList = () => {
  const { doctors } = useSelector(v => v.doctor);
  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Degree",
      selector: row => row.degree
    },
    {
      name: "Phone",
      selector: row => row.phone
    },
    {
      name: "Address",
      selector: row => row.address
    }, {
      name: 'Action',
      cell: row => <> <button className="bg-orange-600 rounded-sm hover:bg-purple-600 px-4 py-2 text-white" onClick={() => hanldeNavigate(row)}>Detail</button></>,
    },
  ]
  const data = doctors;
  // Doctor Detail will be added later
  const hanldeNavigate = (doc) => {
    console.log(doc._id)
  }
  const customStyles = {
    rows: {
      style: {
        backgroundColor: '#f8f9fa', // Background color for rows
        color: '#343a40', // Text color for rows
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
        <h1 className="font-serif">Doctors List</h1>
        <div className="min-h-10">
          <input placeholder="Search here...." className=" border-black border focus:outline-none rounded px-4 py-1" type="text" onChange={handleFilter} name="" id="" />
        </div>
      </div>
      <div className=" px-2">
        <DataTable customStyles={customStyles} onRowClicked={(id) => hanldeNavigate(id)} selectableRows columns={columns} data={records} fixedHeader pagination></DataTable>
      </div>
    </div>
  )
}

export default DoctorList
