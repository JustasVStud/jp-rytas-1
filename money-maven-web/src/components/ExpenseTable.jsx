import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Row, Form, Col } from "react-bootstrap";
import Expense from "./Expense";
import DoughnutChart from "./DoughnutChart";
import NoElementsTableRow from "./NoElementsTableRow";
import { Link } from "react-router-dom";


function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [deleteExpense, setDeleteExpense] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  }, [deleteExpense]);

  const categories = Array.from(
    new Set(expenses.map((expense) => expense.expenseTypeName))
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFilter = () => {
    if (selectedCategory) {
      setExpenses(
        expenses.filter(
          (expense) => expense.expenseTypeName === selectedCategory
        )
      );
    }
  };

  const handleClearFilter = () => {
    setSelectedCategory("");
    axios
      .get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  };

  let expensesjsx;
  if (expenses.length > 0) {
    let filteredExpenses = expenses;
    if (selectedCategory) {
      filteredExpenses = expenses.filter(
        (expense) => expense.expenseTypeName === selectedCategory
      );
    }
    expensesjsx = filteredExpenses.map((expense) => {
      return (
        <Expense
          expense={expense}
          onDelete={() => setDeleteExpense(Date.now())}
          key={expense.expenseId}
        />
      );
    });
  } else {
    expensesjsx = <NoElementsTableRow elementType={"Expense"} />;
  }
  return (
    <>
      <Container>
        
        <Link to={"/expense/create"} className="form-style">
          <Button variant="primary">Create new</Button>
        </Link>
        
        <Row className='table-filter'>
          <Col className='table-filter--size'>
            <Row className="form-buttons-container">
            
              <Button
                variant={selectedCategory ? "secondary" : "primary"}
                onClick={selectedCategory ? handleClearFilter : handleFilter}
              >
                {selectedCategory ? "Clear filter" : "Filter"}
              </Button>
            
              <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
              
            </Row>
          </Col>
        </Row>
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
          <tbody>{expensesjsx}</tbody>
        </Table>
        <Container>
          
        </Container>
        <div>
          <DoughnutChart />;
        </div>

      </Container>
    </>
  );
}

export default ExpenseTable;
