import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from "axios";
import { deleteHandler } from "../services/deleteHandler";

function Category({ expenseType, onDelete }) {
  function deleteExpenseType(typeId) {
    axios
      .delete('http://localhost:8080/api/expenseTypes/' + typeId)
      .then(response => {
        onDelete(expenseType.typeId);
      })
      .catch((err) => console.log(err));
  }
  let deleteParams = {id: expenseType.typeId, type: "Income entry", value: expenseType.typeNamet };

  return (
    <tr className='table-row'>
      <td className="table-cell">{expenseType.typeName}</td>
      <td className='table-cell table-button'>
        <Link to={"add/" + expenseType.typeId}className="table-button">
          <FaPencilAlt />
        </Link>
      </td>
      <td className='table-cell table-button'>
        <FaTrashAlt onClick={() => deleteHandler (deleteParams, deleteExpenseType)}className="table-button" />
      </td>
    </tr>
  );
}

export default Category;