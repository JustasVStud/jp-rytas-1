import { FaTrashAlt, FaEuroSign, FaPencilAlt, FaCalendarAlt, FaCommentAlt} from "react-icons/fa";
import { deleteHandler } from "../../services/deleteHandler";
import { Link } from "react-router-dom";
import { deleteExpense } from '../../services/Expense.service';


function Expense({ expense, onDelete }) {
  
  function deleteFunction(expenseId) {
    deleteExpense(expenseId)
      .then(response => {
        onDelete(response.data);
      })
      .catch(error => console.log(error))
  }

  let deleteParams = {id: expense.expenseId, type: "Expense entry",
    value: expense.expenseAmount + " " + expense.expenseDescription + " " +  expense.expenseTypeName};
  

  return (
    <tr className="table-row">
        <td className="table-cell"><FaEuroSign /> {expense.expenseAmount}</td>
        <td className="table-cell"><FaCalendarAlt/> {new Date(expense.expenseDatetime).toLocaleDateString("lt-LT", { year: "numeric",month: "2-digit",day: "2-digit",})}</td>
        <td className="table-cell table-cell__ellipsis"><FaCommentAlt/> {expense.expenseDescription}</td>
        <td className="table-cell table-cell__ellipsis">{expense.expenseTypeName}</td>
        <td className="table-cell table-button"><Link to={`edit/${expense.expenseId}`} className='table-button'><FaPencilAlt/></Link></td>
        <td className="table-cell table-button"><FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteFunction)} className="table-button"/></td>
      </tr>
    );
}

export default Expense;
