import DataTable from "react-data-table-component"
import Header from "../components/Header"
import { useState } from "react"

const UsersList = () => {
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
      selector: row => row.degree
    },
    {
      name: "Address",
      selector: row => row.degree
    }, {
      name: 'Action',
      cell: row => <> <button className="bg-orange-600 rounded-sm hover:bg-purple-600 px-4 py-2 text-white" onClick={() => hanldeNavigate(row)}>Detail</button></>,
    },
  ]
  const data = [
    {
      id: 1,
      name: "Fahad",
      degree: "MBBS"
    }, {
      id: 2,
      name: "Ahmad",
      degree: "MBBS"
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
      <h1 className="p-2">Doctor Lists</h1>
      <div className="relative w-full min-h-10">
        <input placeholder="Search here...." className="absolute right-10 border-black border focus:outline-none rounded px-4 py-1" type="text" onChange={handleFilter} name="" id="" />
      </div>
      <div className=" px-2">
        <DataTable customStyles={customStyles} onRowClicked={(id) => hanldeNavigate(id)} selectableRows columns={columns} data={records} fixedHeader pagination></DataTable>
      </div>
    </div>
  )
}

export default UsersList