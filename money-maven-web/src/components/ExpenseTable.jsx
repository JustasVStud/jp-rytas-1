import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Pagination, Table, Form, Row, Col } from 'react-bootstrap';

import Expense from './Expense';
import NoElementsTableRow from './NoElementsTableRow';
import { Link } from 'react-router-dom';

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [deleteExpense, setDeleteExpense] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize, setPageSize] = useState(10);
  const [sortDirection, setSortDirection] = useState('DESC');
  const [selectedExpenseType, setSelectedExpenseType] = useState('');
  

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/expenses`, {
        params: {
          page:currentPage,
          pageSize: pageSize,
          direction: sortDirection,
          expenseTypeName: selectedExpenseType || null
        }
      })
      .then((response) => {
        if(response.status === 200) {
          setExpenses(response.data.content);
          setTotalPages(response.data.totalPages);
        }
        if(response.status === 204) {
          setExpenses([]);
          setTotalPages(1);
          setCurrentPage(0);
        }
      })
      .catch((err) => console.log(err));

      axios // added axios call to get expense types
      .get("http://localhost:8080/api/expenseTypes")
      .then((response) => setExpenseTypes(response.data))
      .catch((err) => console.log(err));

  }, [currentPage, pageSize, sortDirection, deleteExpense, selectedExpenseType]);

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setCurrentPage(0)
  }
  const handleSortDirectionChange = () => {
    sortDirection === 'ASC' ? setSortDirection('DESC') : setSortDirection ('ASC');
  }

  const handleSelectedExpenseTypeChange = (e) => {
    setSelectedExpenseType(e.target.value);
    console.log(e.target.value);
  }

  let expenseTypeJsx;

  if(expenseTypes.length > 0){
    expenseTypeJsx = expenseTypes.map((expenseType) => {
      return (<option key={expenseType.typeId} value={expenseType.typeName}>{expenseType.typeName}</option>)
    })
  }

  let expensesJsx;
  if(expenses.length > 0){
    expensesJsx = expenses.map((expense) => {
      return (<Expense expense = {expense} onDelete={() => setDeleteExpense(Date.now())} key={expense.expenseId}/>)
    });
  } else {
    expensesJsx = <NoElementsTableRow elementType={"Expenses"}/>;
  }
  
  return (
    <>
      <Container>
        <Link to={"/expense/create"} className="form-style">
          <Button variant="primary">Create new</Button>
        </Link>
        <Row className='table-filter'>
            <Col>
              <Form.Group>
                <Form.Select
                  id="expenseTypeSelect"
                  value={selectedExpenseType}
                  onChange={handleSelectedExpenseTypeChange}
                >
                  <option value=''>Filter by</option>
                  {expenseTypeJsx}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className='table-filter--size'>
                <Form.Group as={Row}>
                    <Form.Label column>Page size:</Form.Label>
                    <Col>
                        <Form.Select 
                        id="pageSizeSelect" 
                        value={pageSize} 
                        onChange={handlePageSizeChange}
                        className='size--select'>
                            <option value = "10">10</option>
                            <option value = "15">15</option>
                            <option value = "20">20</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Col>
            <Col className='table-filter--sort'>
                <Form.Group className='form-style'>
                    <Button className="mx-2" variant="primary" onClick={handleSortDirectionChange}>
                        {sortDirection === 'ASC' ? <>oldest to newest</> : <>newest to oldest</>}
                    </Button>
                </Form.Group>
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
          <tbody>{expensesJsx}</tbody>
        </Table>
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(0)} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0} />
            {[...Array(totalPages)].map((page, index) => (
                <Pagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages - 1)} />
        </Pagination>
      </Container>
    </>
  );
}

export default ExpenseTable;
