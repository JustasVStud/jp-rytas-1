import { FaTrashAlt, FaEuroSign, FaPencilAlt, FaCalendarAlt, FaCommentAlt} from "react-icons/fa";
import { deleteHandler } from "../services/deleteHandler";
import axios from "axios";
import { Link } from "react-router-dom";

const typeName = [{ value: " ", name: " " }];


function Expense({ expense, onDelete }) {
  function deleteExpense(expenseId) {
    axios
      .delete(`http://localhost:8080/api/expenses/${expenseId}`)
      .then((response) => {
        onDelete(response.data);
      })
      .catch((err) => console.log(err));
  }

  let deleteParams = {
    id: expense.expenseId,
    type: "Expense entry",
    value: `${expense.expenseAmount} ${expense.expenseDescription} ${expense.expenseTypeName}`,
  };

  return (
   <>
    <tr className="table-row">
  
        <td className="table-cell"><FaEuroSign /> {expense.expenseAmount}</td>
      
        <td className="table-cell"><FaCalendarAlt/> {new Date(expense.expenseDatetime).toLocaleDateString("lt-LT", { year: "numeric",month: "2-digit",day: "2-digit",})}</td>
        <td className="table-cell"><FaCommentAlt/> {expense.expenseDescription}</td>
        <td className="table-cell"> {expense.expenseTypeName}</td>
        <td className="table-cell"> {typeName.find((cat) => cat.value === expense.expensetypeName)?.name}
        </td>
        <td className="table-cell table-button">
          <Link
            to={`edit/${expense.expenseId}`}
            className="table-button">
            <FaPencilAlt/>

          </Link>
        </td>
        <td className="table-cell table-button">
          <FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteExpense)}className="table-button"/>
        </td>
      </tr>
    <tr>

    </tr>
    
   </> );
}

export default Expense;
