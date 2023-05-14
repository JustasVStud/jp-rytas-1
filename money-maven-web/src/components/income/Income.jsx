import {FaCalendarAlt, FaCommentAlt, FaEuroSign, FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import { deleteHandler } from '../../services/deleteHandler';
import { Link } from 'react-router-dom';
import { deleteIncome } from '../../services/Income.service';

function Income({income, onDelete}) {
    function deleteFunction(incomeId) {
        deleteIncome(incomeId)
          .then(response => {
            onDelete(response.data);
          })
          .catch(error => console.log(error));
      }
    // duomenys reikalingi istrynimo popup
    let deleteParams = {id: income.incomeId, type: "Income entry", value: income.incomeAmount + " " + income.incomeDescription};
    return ( 
        <tr className='table-row'>
            <td className="table-cell"><FaEuroSign/> {income.incomeAmount}</td>
            <td className='table-cell'><FaCalendarAlt/> {new Date(income.incomeDatetime).toLocaleDateString('lt-LT', {year: 'numeric', month: '2-digit', day: '2-digit'})}</td>
            <td className='table-cell table-cell__ellipsis'> <FaCommentAlt/> {income.incomeDescription}</td>
            <td className='table-cell table-button'>
                <Link to={"edit/" + income.incomeId} className='table-button'>
                    <FaPencilAlt/>
                </Link>
            </td>
            <td className='table-cell table-button'>
            <FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteFunction)} className='table-button'/>
            </td>
        </tr>
     );
}

export default Income;