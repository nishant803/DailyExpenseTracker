import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import useFetch from "../cutomhooks/useFetch";

function GenerateReport() {
  const [reportDate, setReportDate] = useState({});
  const [filteredExpenses,setFilteredExpenses] = useState();
  const columnDefs = [
    { headerName: "Type", field: "type" },
    { headerName: "Description", field: "description" },
    { headerName: "Price", field: "price" },
    { headerName: "Date", field: "date" },
  ];
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReportDate((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reportDate); 
    fetchData();
  };
  
  const fetchData = async () => {
    const res = await fetch("http://localhost:3001/api/expense/range", {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportDate),
    });
    const data = await res.json();
    setFilteredExpenses(data)
  };
  return (
    <div>
      <Navbar />
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <label className="addExpense__formLabel" htmlFor="date">
            From
          </label>
          <input
            className="addExpense__formInput"
            type="date"
            name="from_date"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="" htmlFor="date">
            To
          </label>
          <input
            className="addExpense__formInput"
            type="date"
            name="to_date"
            onChange={handleChange}
          />
        </div>
        <input className="addExpense__formSubmitButton" type="submit" />
      </form>
      <div
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <AgGridReact
          className="ag-theme-balham"
          rowData={filteredExpenses}
          columnDefs={columnDefs}
          headerHeight={70}
          rowHeight={60}
        />
       
      </div>
    </div>
  );
}

export default GenerateReport;
