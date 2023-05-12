import { useState, useEffect } from 'react';
import { Button, Container, Pagination, Spinner, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IncomeTable from './IncomeTable';
import PageSizeSelect from '../PageSizeSelect';
import { getIncomes } from '../../services/Income.service';

function IncomeList() {
  const [incomes, setIncomes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState('DESC');

  useEffect(() => {
    setIsLoading(true);
    getIncomes(currentPage, pageSize, sortDirection)
      .then((data) => {
        setIncomes(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, pageSize, sortDirection]);

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

  return (
    <Container>
      <Row className="table-filter">
        <PageSizeSelect
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
        <Col className="table-filter--sort">
        <Form.Group className='form-style'>
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

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <IncomeTable incomes={incomes} onDeleteIncome={setIncomes} />
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

      <Link to="/income/create" className="form-style">
        <Button variant="primary">Create new</Button>
      </Link>
    </Container>
  );
}

export default IncomeList;