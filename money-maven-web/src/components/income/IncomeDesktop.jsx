import { Button, Container, Row, Col, Form, Spinner, Pagination, Image } from 'react-bootstrap';
import IncomeForm from './IncomeForm';
import IncomeTable from './IncomeTable';
import { useEffect, useState, useCallback } from 'react';
import { getIncomes } from '../../services/Income.service';
import LineChart from '../LineChart';
import PageSizeSelect from '../PageSizeSelect';
import profileStudent from '../../assets/profile-student.svg';
import DateFilterSelect from '../DateFilterSelect';
import moment from 'moment';


function IncomeDesktop() {
    const [incomes, setIncomes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sortDirection, setSortDirection] = useState('DESC');

    const fetchIncomes = useCallback(async () => {
      try {
        setIsLoading(true);
        const { content, totalPages } = await getIncomes(
          currentPage,
          pageSize,
          sortDirection
        );
        setIncomes(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, [currentPage, pageSize, sortDirection]);


      useEffect(() => {
        fetchIncomes();
      }, [fetchIncomes]); 

      const handleIncomeCreate = () => {
        fetchIncomes();
      };

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
                    <Row>
                        <IncomeForm onIncomeCreate={handleIncomeCreate}/>
                    </Row>
                    <Row className="profile-student">
                        <Image src={profileStudent} alt='a sitting student holding some pages' className="profile-student__img"/>
                    </Row>
                </Col>
                <Col>
                <Row>
                    <h3>Incomes</h3>
                </Row>
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
                <DateFilterSelect
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                />
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
                </Col>
                <Col>
                    <Row className='balance-desktop__header'>
                      <h3>Balance</h3>
                    </Row>
                    <Row>
                      <LineChart/>
                    </Row>
                </Col>
            </Row>
        </Container>
     );
}

export default IncomeDesktop;