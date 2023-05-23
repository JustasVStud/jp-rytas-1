import { useState, useEffect } from 'react';
import { Button, Container, Pagination, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getExpenses } from '../../services/Expense.service';
import { getExpenseTypes } from '../../services/Expense_type.service';
import PageSizeSelect from '../PageSizeSelect';
import ExpenseTable from './ExpenseTable';
import ExpenseTypeSelect from '../expense_type/ExpenseTypeSelect';
import DateFilterSelect from '../DateFilterSelect';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortDirection, setSortDirection] = useState("DESC");
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const { content, totalPages } = await getExpenses(
          currentPage,
          pageSize,
          sortDirection,
          selectedExpenseType,
          startDate,
          endDate
        );
        setExpenses(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExpenses();
  }, [
    currentPage,
    pageSize,
    sortDirection,
    selectedExpenseType,
    startDate,
    endDate,
  ]);
  
  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const expenseTypesData = await getExpenseTypes();
        setExpenseTypes(expenseTypesData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchExpenseTypes();
  }, []);

  const handlePageSizeChange = (selectedPageSize) => {
    setPageSize(selectedPageSize);
    setCurrentPage(0);
  };

  const handleSortDirectionChange = () => {
    setSortDirection((prevSortDirection) => 
      prevSortDirection === 'ASC' ? 'DESC' : 'ASC'
    );
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleSelectedExpenseTypeChange = (selectedType) => {
    setSelectedExpenseType(selectedType);
  };

  const handleStartDateChange = (e) => {
    if (e != null) {
      setStartDate(moment(e).format("YYYY-MM-DDTHH:mm:ss"));
    } else {
      setStartDate(e);
    }
  };

  const handleEndDateChange = (e) => {
    if (e != null) {
      setEndDate(moment(e).format("YYYY-MM-DDTHH:mm:ss"));
    } else {
      setEndDate(e);
    }
  };


  return (
      <Container>
        <Row>
          <h3>Expenses</h3>
        </Row>
        <Row className="table-filter">
          <Col>
            <PageSizeSelect
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </Col>
          <Col className="table-filter--sort">
            <Form.Group className="form-style">
              <Button
                className="mx-2"
                variant="primary"
                onClick={handleSortDirectionChange}
              >
                {sortDirection === 'ASC' ? 'Oldest to Newest' : 'Newest to Oldest'}
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <DateFilterSelect
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        <Row className="table-filter">
          <ExpenseTypeSelect
              expenseTypes={expenseTypes}
              selectedExpenseType={selectedExpenseType}
              onSelectedExpenseTypeChange={handleSelectedExpenseTypeChange}
            />
        </Row>
        {isLoading ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
          <ExpenseTable expenses={expenses} onDeleteExpense={setExpenses} />
        )}

      <Pagination>
        <Pagination.First onClick={() => handlePageChange(0)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index === currentPage}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} />
      </Pagination>
      
      <Row className="form-buttons-container">
        <Col>
          <Link to="/expense/create" className="form-style">
            <Button variant="primary" className='row-width-button'>Create new</Button>
          </Link>
        </Col>
      </Row>

      <Row className="form-buttons-container">
        <Col>
        <Link to="/line" className="form-style">
            <Button variant="primary">Line balance</Button>
        </Link>
        </Col>
        <Col>
        <Link to="/doughnut" className="form-style">
            <Button variant="primary">Donut balance</Button>
        </Link>
        </Col>
      </Row>
      </Container>
  );
}

export default ExpenseList;
