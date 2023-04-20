import {useState, useEffect} from 'react';
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import Expense from './Expense';
import NoElementsTableRow from './NoElementsTableRow';
// import { Link } from 'react-router-dom';

function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [deleteExpense, setDeleteExpense] = useState([]);
    
    useEffect(() => {
        console.log('trigger');
        axios
        .get('http://localhost:8080/api/expenses')
        .then(response => setExpenses(response.data))
        .catch((err) => console.log(err))
    }, [deleteExpense]);
    
    let expensesjsx;
    if(expenses.length > 0){
        expensesjsx = expenses.map((expense) => {
            return (<Expense expense = {expense} setDeleteExpense = {setDeleteExpense} key={expense.expenseId}/>)
        });
    } else {
        expensesjsx = <NoElementsTableRow elementType={"Expense"}/>
    }
    return ( 
        <>  
        <Container>
            {/* <Link to={"/expense/create"} className='form-style'>
                <Button variant='primary'>Create new</Button>
            </Link> */}
            <Table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {expensesjsx}
                </tbody>
            </Table>
        </Container>
        </> );
}

export default ExpenseTable;    