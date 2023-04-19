import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteHandler } from '../services/deleteHandler';
import axios from 'axios';
import { Link } from 'react-router-dom';

const categories = [
  { value: 1, name: 'Food' },
  { value: 2, name: 'Clothes' },
  { value: 3, name: 'Medicine' },
  { value: 4, name: 'Entertainment' },
  { value: 5, name: 'Other' }
];

function Expense({ expense, setDeleteExpense }) {
  function deleteExpense(expenseId) {
    axios
      .delete(`http://localhost:8080/api/expenses/${expenseId}`)
      .then(response => {
        setDeleteExpense(response.data);
      })
      .catch(err => console.log(err));
  }

 
  let deleteParams = {
    id: expense.expenseId,
    type: 'Expense entry',
    value: `${expense.expenseAmount} ${expense.expenseDescription}`,
  };

  return (
    <tr>
      <td className="amount amount--expense">{expense.expenseAmount}</td>
      <td>{expense.expenseDescription}</td>
      <td>{new Date(expense.expenseDatetime).toLocaleDateString('lt-LT', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
      <td>{categories.find(cat => cat.value === expense.expenseCategory)?.name}</td>
      <td>
        <Link to={`edit/${expense.expenseId}`}>
          <FaEdit />
        </Link>
      </td>
      <td>
        <FaTrashAlt onClick={() => deleteHandler(deleteParams, deleteExpense)} />
      </td>
    </tr>
  );
}

export default Expense;
