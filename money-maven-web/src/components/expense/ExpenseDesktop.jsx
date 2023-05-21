import { Button, Container, Row, Col, Form, Spinner, Pagination } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import LineChart from '../LineChart';
import PageSizeSelect from '../PageSizeSelect';
import DoughnutChart from '../DoughnutChart';
import ExpenseTable from './ExpenseTable';
import { getExpenses } from '../../services/Expense.service';
import { getExpenseTypes } from '../../services/Expense_type.service';
import moment from 'moment';
import ExpenseForm from './ExpenseForm';
import ExpenseTypeSelect from '../expense_type/ExpenseTypeSelect';
import DateTimePicker from 'react-datetime-picker';
import { FaCalendarAlt } from 'react-icons/fa';

function ExpenseDesktop() {
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
                <Col>
                    <ExpenseForm/>
                </Col>
                <Col>
                <Row>
          <h3>Expenses</h3>
        </Row>
        <Row className="table-filter">
          <Col>
            <ExpenseTypeSelect
                expenseTypes={expenseTypes}
                selectedExpenseType={selectedExpenseType}
                onSelectedExpenseTypeChange={handleSelectedExpenseTypeChange}
                />
            </Col>
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
            <Row className="table-filter">
            <Col>
                <Form.Label>Date from:</Form.Label>
                <DateTimePicker
                value={startDate}
                name="startDate"
                format="yyyy-MM-dd"
                calendarIcon={<FaCalendarAlt />}
                className="table-filter--date"
                disableClock={true}
                yearPlaceholder="YYYY"
                monthPlaceholder="MM"
                dayPlaceholder="DD"
                onChange={handleStartDateChange}
                />
            </Col>
            <Col>
                <Form.Label>Date until:</Form.Label>
                <DateTimePicker
                value={endDate}
                name="dateFilterUntil"
                format="yyyy-MM-dd"
                calendarIcon={<FaCalendarAlt />}
                className="table-filter--date"
                disableClock={true}
                yearPlaceholder="YYYY"
                monthPlaceholder="MM"
                dayPlaceholder="DD"
                onChange={handleEndDateChange}
                />
            </Col>
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
                </Col>
                <Col>
                <Row>
                    <LineChart/>
                </Row>
                <Row>
                    <DoughnutChart/>
                </Row>
                </Col>
            </Row>
        </Container>
     );
}

export default ExpenseDesktop;