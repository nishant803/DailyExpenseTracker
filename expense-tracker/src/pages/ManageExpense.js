import React, { useState, useEffect, useMemo } from "react";
import { incTotal } from "../redux/ExpenseSlice";
import Navbar from "../Components/Navbar";
import { useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./manageExpense.css"
import FormDialogue from "../Components/FormDialogue";

function ManageExpense() {
  const dispatch = useDispatch();
  const [expense, setExpense] = useState(["abc  "]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getExpenses = async () => {
    const response = await fetch("http://localhost:3001/api/expense/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setExpense(data);
  }

  useEffect(() => {
    getExpenses();
  }, [])


  const [isUpdating, setIsUpdating] = useState(false);
  const [oldData, setOldData] = useState({});
  const handleDelete = async (id) => {
    fetch(`http://localhost:3001/api/expense/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          getExpenses();
        }
      })
      // .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(oldData)
    if (oldData) {
      const {date,type,description,price} = oldData
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(`http://localhost:3001/api/expense/${oldData._id}`, {
        method: "PUT", 
        body: JSON.stringify({date,type,description, price}), 
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      }).then(resp => resp.json())
        .then(resp => {
          console.log(resp);
          handleClose()
          getExpenses()
        })
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setOldData((values) => ({ ...values, [name]: value }));
  };
  const handleDeleteExpense = (expense) => {
  
    if(window.confirm("Are you sure"))
    handleDelete(expense.data._id);
  };
  const handleUpdateExpense = (expense) => {
    handleClickOpen();
    setIsUpdating(true);
    setOldData(expense.data);
  };
  // console.log(isUpdating)
  const columnDefs = [
    { headerName: "Type", field: "type" },
    { headerName: "Description", field: "description" },
    { headerName: "Price", field: "price" },
    { headerName: "Date", field: "date" },
    {
      headerName: "Actions",
      field: "price",
      cellRenderer: (params) => (
        <div>
          <button className="" onClick={() => handleUpdateExpense(params)}>Edit</button>
          <button className="" onClick={() => handleDeleteExpense(params)}>Delete</button>
        </div>
      ),
    },
  ];
  const formErrors = 10;
  const data = 20;
  return (
    <div>
      <Navbar />

      <div
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <AgGridReact
          className="ag-theme-balham"
          rowData={expense}
          columnDefs={columnDefs}
          headerHeight={70}
          rowHeight={60}
        />
        <FormDialogue open={open} formErrors={formErrors} type="update"
          data={oldData} handleChange={handleChange} handleSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

export default ManageExpense;
