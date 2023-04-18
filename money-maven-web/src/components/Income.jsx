import {FaCalendarAlt, FaCommentAlt, FaEuroSign, FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
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
        <>
        <tr className='table-row'>
            <td className="amount amount--income table-cell"><FaEuroSign/> {income.incomeAmount}</td>
            <td className='table-cell'><FaCalendarAlt/> {new Date(income.incomeDatetime).toLocaleDateString('lt-LT', {year: 'numeric', month: '2-digit', day: '2-digit'})}</td>
            <td className='table-cell'> <FaCommentAlt/> {income.incomeDescription}</td>
            <td className='table-cell table-button'>
                <Link to={"edit/" + income.incomeId} className='table-button'>
                    <FaPencilAlt/>
                </Link>
            </td>
            <td className='table-cell table-button'>
                <FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteIncome)} className='table-button'/>
            </td>
        </tr>
        <tr>

        </tr>
        </>
     );
}

export default Income;