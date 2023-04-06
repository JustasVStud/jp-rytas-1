import React from 'react'

function IncomeForm() {
  return (
    <div className="p-5 form-style">
        <h2 className="text-center">Income</h2>
        <form >
            <div className="form-group">
                <label htmlFor="salary">Amount</label>
                <input type="text" className="form-control form-input" id="salary" aria-describedby="emailHelp" placeholder='1000€'/>
            </div>
            <div className="form-group">
                <label htmlFor="investments">Description</label>
                <input type="text" className="form-control form-input" id="investments" placeholder='Transport'/>
            </div>
            <div className="form-group">
                <label htmlFor="gifts">Date</label>
                <input type="date" className="form-control form-input" id="gifts"/>
            </div>
            <div className="form-group">
                <label htmlFor="allowance">Time</label>
                <input type="time" className="form-control form-input" id="allowance"/>
            </div>

            <div className='form-buttons'>
                <button type="submit" className='main-button'>Save</button>
                <button type="reset" className='main-button'>Reset</button>
            </div>
            </form>
        </div>
  )
}

export default IncomeForm