import { FaTrashAlt, FaEuroSign, FaPencilAlt} from "react-icons/fa";
import { deleteHandler } from "../../services/deleteHandler";
import { Link } from "react-router-dom";
import { deleteBudget } from '../../services/Budget.service';
function Budget({budget, onDelete}) {

      
  function deleteFunction(budgetId) {
    deleteBudget(budgetId)
      .then(response => {
        onDelete(response.data);
      })
      .catch(error => console.log(error))
  }

  let deleteParams = {id: budget.budgetId, type: "Budget entry",
    value: budget.budgetAmount + " " +  budget.expenseTypeName};

    return ( 
    <tr className="table-row">
        <td className="table-cell table-cell__ellipsis">{budget.expenseTypeName}</td>
        <td className="table-cell"><FaEuroSign /> {budget.budgetAmount}</td>
        <td className="table-cell table-button"><Link to={`edit/${budget.budgetId}`} className='table-button'><FaPencilAlt/></Link></td>
        <td className="table-cell table-button"><FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteFunction)} className="table-button"/></td>
  </tr> 
  );
}

export default Budget;