import { Table } from 'react-bootstrap';
import Expense from './Expense';
import NoElementsTableRow from '../NoElementsTableRow';

function ExpenseTable({ expenses, onDeleteExpense}) {
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
                            onDelete={() => onDeleteExpense(Date.now())}
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