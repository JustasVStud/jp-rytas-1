import {useState, useEffect} from 'react';
import axios from "axios";
import { Table } from "react-bootstrap";
import ExpenseCategory from './ExpenseCategory';
import NoElementsTableRow from './NoElementsTableRow';

function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [deleteExpense, setDeleteExpense] = useState([]);
    
    useEffect(() => {
        axios
        .get('http://localhost:8080/api/expenses')
        .then(response => setExpenses(response.data))
        .catch((err) => console.log(err))
    }, [deleteExpense]);
    
    let expensesjsx;
    if(expenses.length > 0){
        expensesjsx = expenses.map((expense) => {
            return (<ExpenseCategory expense = {expense} setDeleteExpense = {setDeleteExpense} key={expense.expenseId}/>)
        });
    } else {
        expensesjsx = <NoElementsTableRow elementType={"Expense"}/>
    }
    return ( 
    <>
        <Table>
            <tbody>
                {expensesjsx}
            </tbody>
        </Table>
    </> );
}

export default ExpenseTable;    