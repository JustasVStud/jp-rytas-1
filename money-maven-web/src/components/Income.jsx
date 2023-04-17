import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import { deleteHandler } from '../services/deleteHandler';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Income({income, onDelete}) {
    function deleteIncome(incomeId) {
        axios
        .delete('http://localhost:8080/api/incomes/' + incomeId)
        .then(response => {
            onDelete(response.data)
        })
        .catch((err) => console.log(err));
    }
    // duomenys reikalingi istrynimo popup
    let deleteParams = {id: income.incomeId, type: "Income entry", value: income.incomeAmount + " " + income.incomeDescription};
    return ( 
        <tr>
            <td className="amount amount--income">{income.incomeAmount}</td>
            <td>{income.incomeDescription}</td>
            <td>{new Date(income.incomeDatetime).toLocaleDateString('lt-LT', {year: 'numeric', month: '2-digit', day: '2-digit'})}</td>
            <td>
                <Link to={"edit/" + income.incomeId}>
                    <FaEdit/>
                </Link>
            </td>
            <td>
                <FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteIncome)}/>
            </td>
        </tr>
     );
}

export default Income;