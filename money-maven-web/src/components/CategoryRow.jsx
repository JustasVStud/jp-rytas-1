import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteHandler } from '../services/deleteHandler';
import { Link } from 'react-router-dom';




function CategoryRow({ expenseType, deleteExpenseType }) {
    
  const deleteParams = { id: expenseType.typeId, type: "Category name", value: expenseType.typeName };
  
 return (
    <tr>
      <td className="expense type">{expenseType.typeName}</td>
      <td>
      <Link to={"add/" + expenseType.typeId}>
          <FaEdit className="icon" />
        </Link>
      </td>
      <td>
        <FaTrashAlt className="icon" onClick={() => deleteHandler(deleteParams, deleteExpenseType )} />
      </td>
    </tr>
  );
}

export default CategoryRow;
