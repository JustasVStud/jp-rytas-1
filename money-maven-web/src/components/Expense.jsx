import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteHandler } from '../services/deleteHandler';
import axios from 'axios';

import { Link } from 'react-router-dom';

const typeName = [
  { value: 1, name: 'Food' },
  { value: 2, name: 'Clothes' },
  { value: 3, name: 'Medicine' },
  { value: 4, name: 'Entertainment' },
  { value: 5, name: 'Other' }
];
// const [expenseTypes, setExpenseTypes] = useState([]);
// const [selectedCategory, setSelectedCategory] = useState(null);

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
      <td className="amount expense">{expense.expenseAmount}</td>
      
      <td>{new Date(expense.expenseDatetime).toLocaleDateString('lt-LT', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
      <td>{expense.expenseDescription}</td>
      <td>{typeName.find(cat => cat.value === expense.expensetypeName)?.name}</td>
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
