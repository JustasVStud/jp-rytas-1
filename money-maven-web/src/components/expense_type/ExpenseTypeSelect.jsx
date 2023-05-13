import React from 'react';
import { Form } from 'react-bootstrap';

function ExpenseTypeSelect({ expenseTypes, selectedExpenseType, onSelectedExpenseTypeChange }) {
  const handleSelectedExpenseTypeChange = (e) => {
    onSelectedExpenseTypeChange(e.target.value);
  };

  const expenseTypeOptions = expenseTypes.map((expenseType) => (
    <option key={expenseType.typeId} value={expenseType.typeName}>
      {expenseType.typeName}
    </option>
  ));

  return (
    <Form.Group>
      <Form.Select
        id="expenseTypeSelect"
        value={selectedExpenseType}
        className="expense-type--select"
        onChange={handleSelectedExpenseTypeChange}
      >
        <option value="">Filter by</option>
        {expenseTypeOptions}
      </Form.Select>
    </Form.Group>
  );
}

export default ExpenseTypeSelect;
