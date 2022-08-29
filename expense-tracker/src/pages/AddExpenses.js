import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./addExpense.css";
import Modal from "../Components/Modal";
import { AddExpenseValidation } from "../Components/Validate";
import FormDialogue from "../Components/FormDialogue";

function Expense(date) {
  const history = useHistory();
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(AddExpenseValidation(data));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetch("http://localhost:3001/api/expense/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((res) => {
        console.log(res);
        setData({});
        setIsOpen(true);
        setTimeout(() => {
          history.push("/manageexpense");
        }, 1500);
      });
    }
  }, [formErrors]);
  return (
    <div>
      <Navbar />

      <div className="addExpense">
      <FormDialogue open={true}  formErrors = {formErrors} type="add"
        data={data} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Expense;
