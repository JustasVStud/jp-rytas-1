import { Table } from 'react-bootstrap';
import Budget from './Budget';
import NoElementsTableRow from '../NoElementsTableRow';

function BudgetTable({budgets, onDeleteBudget}) {
    return ( 
        <Table>
            <thead>
                <tr>
                    <th>ExpenseType</th>
                    <th>Amount</th>
                    <th>Month</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {budgets && budgets.length > 0 ? (
                    budgets.map((budget) => (
                        <Budget
                            key={budget.budgetId}
                            budget={budget}
                            onDelete={() => onDeleteBudget(Date.now())}
                        />
                    ))
                ) : (
                    <NoElementsTableRow elementType='Budgets' />
                )}
            </tbody>
        </Table>
    );
}

export default BudgetTable;