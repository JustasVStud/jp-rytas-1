import React from 'react'

function IncomeForm() {
  return (
    <div className="p-5">
        <h2 className="text-center">Income</h2>
        <form >
            <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input type="text" className="form-control" id="salary" aria-describedby="emailHelp"/>
            </div>
            <div className="form-group">
                <label htmlFor="interest">Interest</label>
                <input type="text" className="form-control" id="interest"/>
            </div>
            <div className="form-group">
                <label htmlFor="investments">Investments</label>
                <input type="text" className="form-control" id="investments"/>
            </div>
            <div className="form-group">
                <label htmlFor="gifts">Gifts</label>
                <input type="text" className="form-control" id="gifts"/>
            </div>
            <div className="form-group">
                <label htmlFor="allowance">Allowance</label>
                <input type="text" className="form-control" id="allowance"/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default IncomeForm