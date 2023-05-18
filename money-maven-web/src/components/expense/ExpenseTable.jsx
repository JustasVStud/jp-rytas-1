import { Table } from 'react-bootstrap';
import Expense from './Expense';
import NoElementsTableRow from '../NoElementsTableRow';

function ExpenseTable({ expenses, onDeleteExpense}) {
    const handleDeleteExpense = (deletedExpenseId) => {
        onDeleteExpense(expenses.filter(expense => expense.incomeId !== deletedExpenseId));
      };
    return ( 
        <Table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Date </th>
                    <th>Description</th>
                    <th>Expense type</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {expenses && expenses.length > 0 ? (
                    expenses.map((expense) => (
                        <Expense
                            key={expense.expenseId}
                            expense={expense}
                            onDelete={() => handleDeleteExpense(expense.expenseId)}
                        />
                    ))
                ) : (
                    <NoElementsTableRow elementType='Expenses' />
                )}
            </tbody>
        </Table>
     );
}

export default ExpenseTable;