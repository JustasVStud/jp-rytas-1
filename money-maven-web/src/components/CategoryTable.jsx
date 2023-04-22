import { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Row, Table, Container } from "react-bootstrap";
import NoElementsTableRow from './NoElementsTableRow';
import Category from './Category';
import { Link } from 'react-router-dom';

function CategoryTable() {
  const [expenseTypes, setExpenseTypes] = useState([]);

  useEffect(() => {
    console.log('trigger');
    axios
      .get('http://localhost:8080/api/expenseTypes')
      .then(response => setExpenseTypes(response.data))
      .catch((err) => console.log(err))
  }, []);

  function handleDelete(id) {
    setExpenseTypes(expenseTypes.filter(expenseType => expenseType.typeId !== id));
  }

  let CategoryJSX;
  if (expenseTypes.length > 0) {
    CategoryJSX = expenseTypes.map((expenseType) => {
      return (<Category expenseType={expenseType} onDelete={handleDelete} key={expenseType.typeId} />)
    });
  } else {
    CategoryJSX = <NoElementsTableRow elementAddCategory={"ExpenseTypes"} />;
  }

  return (
    <Container className="form-style">
      <Row className="form-buttons-container">
        <Link to={"/category/add/"}>
          <Button variant="primary">Create</Button>
        </Link>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Expense Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {CategoryJSX}
        </tbody>
      </Table>
    </Container>
  );
}

export default CategoryTable;