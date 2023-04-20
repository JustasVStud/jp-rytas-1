import {useState, useEffect} from 'react'; 
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import Income from './Income';
import NoElementsTableRow from './NoElementsTableRow';
import { Link } from 'react-router-dom';

function IncomeTable() {

    const [incomes, setIncomes] = useState([]);
    const [deleteIncome, setDeleteIncome] = useState([]);

    useEffect(() => {
        console.log('trigger');
        axios
        .get('http://localhost:8080/api/incomes')
        .then(response => setIncomes(response.data))
        .catch((err) => console.log(err))
    }, [deleteIncome]);
    
    let incomesjsx;
    if(incomes.length > 0){
        incomesjsx = incomes.map((income) => {
            return (<Income income = {income} onDelete={() => setDeleteIncome(Date.now())} key={income.incomeId}/>)
        });
    } else {
        incomesjsx = <NoElementsTableRow elementType={"Incomes"}/>
    }
    return ( 
    <>  
    <Container>
        <Link to={"/income/create"} className='form-style'>
            <Button variant='primary'>Create new</Button>
        </Link>
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
                {incomesjsx}
            </tbody>
        </Table>
    </Container>
    </> );
}

export default IncomeTable;