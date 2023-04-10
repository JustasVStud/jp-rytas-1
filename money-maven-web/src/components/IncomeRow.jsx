import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import { deleteHandler } from '../services/deleteHandler';
import axios from 'axios';
import { Link } from 'react-router-dom';

function IncomeRow({income, setDeleteIncome}) {
    function deleteIncome(incomeId) {
        axios
        .delete('http://localhost:8080/api/incomes/' + incomeId)
        .then(response => {
            setDeleteIncome(response.data)
        })
        .catch((err) => console.log(err));
    }
    // duomenys reikalingi istrynimo popup
    let deleteParams = {id: income.incomeId, type: "Income entry", value: income.incomeAmount + " " + income.incomeDescription};
    return ( 
        <tr>
            <td>{income.incomeAmount}</td>
            <td>{income.incomeDescription}</td>
            <td>{income.incomeDatetime}</td>
            <td>
                <Link to={"edit/" + income.incomeId}>
                    <FaEdit/>
                </Link>
            </td>
            <td>
                <span>
                    <FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteIncome)}/>
                </span>
                
            </td>
        </tr>
     );
}

export default IncomeRow;