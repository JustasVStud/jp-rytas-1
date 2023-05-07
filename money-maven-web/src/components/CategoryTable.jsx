import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Row, Table, Container } from 'react-bootstrap';
import NoElementsTableRow from './NoElementsTableRow';
import Category from './Category';
import { Link } from 'react-router-dom';

function CategoryTable() {
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [deleteExpenseTypes, setDeleteExpenseTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get('http://localhost:8080/api/expenseTypes', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        },
        cancelToken: source.token
      })
      .then((response) => setExpenseTypes(response.data))
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log(err);
        }
      });
      return () => {
        source.cancel('Component unmounted');
    };
  }, [deleteExpenseTypes, token]);

  let categoryjsx;
  if (expenseTypes.length > 0) {
    categoryjsx = expenseTypes.map((expenseType) => {
      return (
        <Category
          expenseType={expenseType}
          onDelete={() => setDeleteExpenseTypes(Date.now())}
          key={expenseType.typeId}
          onError={setErrorMessage}
        />
      );
    });
  } else {
    categoryjsx = <NoElementsTableRow elementAddCategory={'ExpenseTypes'} />;
  }

  return (
    <Container className="form-style">
      {errorMessage ? (
        <Row>
          <div className="alert alert-danger">{errorMessage}</div>
        </Row>
      ) : null}
      <Row className="form-buttons-container">
        <Link to={'/category/add/'}>
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
        <tbody>{categoryjsx}</tbody>
      </Table>
    </Container>
  );
}

export default CategoryTable;