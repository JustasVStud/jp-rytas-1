import {useState, useEffect} from 'react'; 
import axios from "axios";
import { Table } from "react-bootstrap";

function IncomeTable() {

    //const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:8080/api/incomes/')
        .then(response => console.log(response))
    });

    return ( 
    <>
        <Table>
            
        </Table>
    </> );
}

export default IncomeTable;