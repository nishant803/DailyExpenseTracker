import React from 'react'
import Modal from "../Components/Modal";

function FormDialogue({open,type,handleClose,formErrors,data,handleChange,handleSubmit}) {
  return (
    <div 
    style={{display:open ? "block" : "none"}}
    open={open}
           onClose={handleClose} >
             <div className={type === "add" ? "addExpense__inner" : ""}>
          <form
          autoComplete='off'
            className= {type === "add" ? "addExpense__form" : "updateExpense__form"} 

            onSubmit={handleSubmit}
          >
            {/* <div >{ <Modal title="Expense Added Successfully" />}</div> */}
            <h1>{type==="add" ? "Add Expense" : "Update Expense"}</h1>
            <div className="addExpense__form-group">
              <label className="addExpense__formLabel" htmlFor="date">
                Date
              </label>
              <input
                className="addExpense__formInput"
                type="date"
                name="date"
                onChange={handleChange}
              />
              <p className="addExpense__errorMessage">{formErrors?.date}</p>
            </div>
           
            <div className="addExpense__form-group">
              <label className="addExpense__formLabel">Type</label>
              <input
                className="addExpense__formInput"
                type="text"
                name="type"
                onChange={handleChange}
                value={data.type || ""}
              />
              <p className="addExpense__errorMessage">
                {formErrors?.description}
              </p>
            </div>
            <div className="addExpense__form-group">
              <label className="addExpense__formLabel">Description</label>
              <input
                className="addExpense__formInput"
                type="text"
                name="description"
                onChange={handleChange}
                value={data.description || ""}
              />
              <p className="addExpense__errorMessage">
                {formErrors?.description}
              </p>
            </div>
            <div className="addExpense__form-group">
              <label className="addExpense__formLabel">Price</label>
              <input
                className="addExpense__formInput"
                type="number"
                name="price"
                onChange={handleChange}
                value={data.price || ""}
              />
              <p className="addExpense__errorMessage">{formErrors?.price}</p>
            </div>
            <input className="addExpense__formSubmitButton" type="submit" />
          </form>
        </div>
    </div>
  )
}

export default FormDialogue