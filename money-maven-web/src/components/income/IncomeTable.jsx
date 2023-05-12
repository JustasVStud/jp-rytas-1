import { Table } from 'react-bootstrap';
import Income from './Income';
import NoElementsTableRow from '../NoElementsTableRow';

function IncomeTable({ incomes, onDeleteIncome }) {
  return (
    <Table>
      <thead>
      <tr>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
      </thead>
      <tbody>
        {incomes && incomes.length > 0 ? (
          incomes.map((income) => (
            <Income
              key={income.incomeId}
              income={income}
              onDelete={() => onDeleteIncome(Date.now())}
            />
          ))
        ) : (
          <NoElementsTableRow elementType="Incomes" />
        )}
      </tbody>
    </Table>
  );
}

export default IncomeTable;
