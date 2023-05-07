import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from "axios";
import { deleteHandler } from '../services/deleteHandler';

function Category({ expenseType, onDelete, onError}) {
  const token = JSON.parse(localStorage.getItem('user'));
  const source = axios.CancelToken.source();

  function deleteExpenseType(typeId) {
    axios
      .delete('http://localhost:8080/api/expenseTypes/' + typeId, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        },
        cancelToken: source.token
      })
      .then(() => {
        onDelete(expenseType.typeId);
      })
      .catch((err) => {
        onDelete(expenseType.typeId);
        if(err.response?.status === 409){
          onError(`${expenseType.typeName} cannot be deleted due to existing Expenses that are using it`);
        } else {
          onError(`There was an internal server error while deleting the ${expenseType.typeName} expense type`);
        }
        if (!axios.isCancel(err)) {
          console.log(err);
        }
      });
  }
  let deleteParams = {id: expenseType.typeId, type: "Expense type", value: expenseType.typeName };

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