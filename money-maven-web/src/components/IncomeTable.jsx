import {useState, useEffect} from 'react'; 
import axios from "axios";
import { Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Income from './Income';

function IncomeTable() {

    const [incomes, setIncomes] = useState([]);
    const [deleteIncome, setDeleteIncome] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:8080/api/incomes')
        .then(response => setIncomes(response.data))
        .catch((err) => console.log(err))
    }, [deleteIncome]);
    
    let incomesjsx = incomes.map((income) => {
        return (<Income income = {income} setDeleteIncome = {setDeleteIncome} key={income.incomeId}/>)
    });
    return ( 
    <>
        <Table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Edit <FaEdit/></th>
                    <th>Delete <FaTrashAlt/></th>
                </tr>
            </thead>
            <tbody>
                {incomesjsx}
            </tbody>
        </Table>
    </> );
}

export default IncomeTable;