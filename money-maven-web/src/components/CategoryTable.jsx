import { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Row, Table, Container } from "react-bootstrap";
import NoElementsTableRow from './NoElementsTableRow';
import CategoryRow from './CategoryRow';
import { Link } from 'react-router-dom';

const baseUrl = "http://localhost:8080/api/expenseTypes";
function CategoryTable() {
  const [expenseTypes, setExpenseTypes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/expenseTypes')
      .then(response => setExpenseTypes(response.data))
      .catch((err) => console.log(err))
  }, []);

  const deleteExpenseType = (id) => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then(response => {
        console.log(response.data);
        setExpenseTypes(expenseTypes.filter(et => et.typeId !== id));
      })
      .catch((err) => console.log(err));
  }

  let categoryRowJSX;
  if (expenseTypes.length > 0) {
    categoryRowJSX = expenseTypes.map((expenseType) => {
      return (
        <CategoryRow
          expenseType={expenseType}
          deleteExpenseType={deleteExpenseType}
          key={expenseType.typeId}
        />
      );
    });
  } else {
    categoryRowJSX = <NoElementsTableRow elementAddCategory={"ExpenseTypes"} />;
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
          {categoryRowJSX}
        </tbody>
      </Table>
      </Container>
   
  );
}

export default CategoryTable;
