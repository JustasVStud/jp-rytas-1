import React from 'react'
import Form from '../components/ExpenseForm'
import ExpenseTable from '../components/ExpenseTable'
import ExpenseCategory from '../components/ExpenseCategory'


function ExpensePage() {
  return (
    <>
    {/* <ExpenseCategory /> */}
    <Form />
    <ExpenseTable/>
    </>
  )
}

export default ExpensePage