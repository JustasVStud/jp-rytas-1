import { Table } from 'react-bootstrap';
import Budget from './Budget';
import NoElementsTableRow from '../NoElementsTableRow';

function BudgetTable({budgets, onDeleteBudget}) {
    const handleDeleteBudget = (deletedBudgetId) => {
        onDeleteBudget(budgets.filter(budget => budget.budgetId !== deletedBudgetId))
    };
    return ( 
        <Table>
            <thead>
                <tr>
                    <th>ExpenseType</th>
                    <th>Amount</th>
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
                            onDelete={() => handleDeleteBudget(budget.budgetId)}
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