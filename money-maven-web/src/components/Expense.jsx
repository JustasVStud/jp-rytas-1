import { FaTrashAlt, FaEuroSign, FaPencilAlt, FaCalendarAlt, FaCommentAlt} from "react-icons/fa";
import { deleteHandler } from "../services/deleteHandler";
import axios from "axios";
import { Link } from "react-router-dom";



function Expense({ expense, onDelete }) {
  
  function deleteExpense(expenseId) {
    const token = JSON.parse(localStorage.getItem('user'));
    axios
      .delete(`http://localhost:8080/api/expenses/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        }
      })
      .then((response) => {
        onDelete(response.data);
      })
      .catch((err) => console.log(err));
  }

  let deleteParams = {id: expense.expenseId, type: "Expense entry",
    value: expense.expenseAmount + " " + expense.expenseDescription + " " +  expense.expenseTypeName};
  

  return (
   <>
    <tr className="table-row">
        <td className="table-cell"><FaEuroSign />&nbsp;&nbsp;{expense.expenseAmount}</td>
        <td className="table-cell"><FaCalendarAlt/>&nbsp;&nbsp;{new Date(expense.expenseDatetime).toLocaleDateString("lt-LT", { year: "numeric",month: "2-digit",day: "2-digit",})}   </td>
        <td className="table-cell table-cell__ellipsis"><FaCommentAlt/>&nbsp;&nbsp;{expense.expenseDescription}</td>
        <td className="table-cell table-cell__ellipsis">{expense.expenseTypeName}</td>
        <td className="table-cell table-button"><Link to={`edit/${expense.expenseId}`} className='table-button'><FaPencilAlt/></Link></td>
        <td className="table-cell table-button"><FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteExpense)} className="table-button"/></td>
      </tr>
   </> );
}

export default Expense;
