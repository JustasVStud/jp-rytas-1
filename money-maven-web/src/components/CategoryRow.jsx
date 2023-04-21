import { FaTrashAlt, FaPencilAlt, } from 'react-icons/fa';
import { deleteHandler } from '../services/deleteHandler';
import { Link } from 'react-router-dom';




function CategoryRow({ expenseType, deleteExpenseType }) {
    
  const deleteParams = { id: expenseType.typeId, type: "Category name", value: expenseType.typeName };
  
 return (
    <tr className='table-row'>
      <td className="table-cell">{expenseType.typeName}</td>

      <td className='table-cell table-button'>
      <Link to={"add/" + expenseType.typeId}>
          <FaPencilAlt/>
          
        </Link>
      </td>
      <td className='table-cell table-button'>
        <FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteExpenseType )} />
      </td>
    </tr>
  );
}

export default CategoryRow;
