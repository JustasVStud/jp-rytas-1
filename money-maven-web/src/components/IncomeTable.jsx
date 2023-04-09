import {useState, useEffect} from 'react'; 
import axios from "axios";
import { Table } from "react-bootstrap";
import Income from './Income';
import NoElementsTableRow from './NoElementsTableRow';

function IncomeTable() {

    const [incomes, setIncomes] = useState([]);
    const [deleteIncome, setDeleteIncome] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:8080/api/incomes')
        .then(response => setIncomes(response.data))
        .catch((err) => console.log(err))
    }, [deleteIncome]);
    
    let incomesjsx;
    if(incomes.length > 0){
        incomesjsx = incomes.map((income) => {
            return (<Income income = {income} setDeleteIncome = {setDeleteIncome} key={income.incomeId}/>)
        });
    } else {
        incomesjsx = <NoElementsTableRow elementType={"Incomes"}/>
    }
    return ( 
    <>
        <Table>
            <tbody>
                {incomesjsx}
            </tbody>
        </Table>
    </> );
}

export default IncomeTable;