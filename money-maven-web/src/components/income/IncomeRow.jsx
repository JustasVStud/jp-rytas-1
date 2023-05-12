import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import { deleteHandler } from '../services/deleteHandler';
import { deleteIncome } from '../../services/Income.service';
import { Link } from 'react-router-dom';

function IncomeRow({income, setDeleteIncome}) {
    function handleDelete(incomeId) {
        deleteIncome(incomeId)
          .then(response => {
            setDeleteIncome(response.data);
          })
          .catch(error => console.log(error));
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
                    <FaTrashAlt onClick={() => deleteHandler(deleteParams, handleDelete)}/>
                </span>
                
            </td>
        </tr>
     );
}

export default IncomeRow;