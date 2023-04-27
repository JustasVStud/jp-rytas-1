import {useState, useEffect} from 'react'; 
import axios from "axios";
import { Button, Container, Pagination, Table, Form, Row, Col } from "react-bootstrap";
import Income from './Income';
import NoElementsTableRow from './NoElementsTableRow';
import { Link } from 'react-router-dom';
// import { FaRegFileWord } from 'react-icons/fa';

function IncomeTable() {

    const [incomes, setIncomes] = useState([]);
    const [deleteIncome, setDeleteIncome] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortDirection, setSortDirection] = useState('DESC');

    useEffect(() => {
        axios
        .get(`http://localhost:8080/api/incomes`, {
            params: {
                page:currentPage,
                pageSize: pageSize,
                direction: sortDirection
            }
        })
        .then(response => {
            setIncomes(response.data.content);
            setTotalPages(response.data.totalPages);
        })
        .catch((err) => console.log(err))
    }, [currentPage, pageSize, sortDirection, deleteIncome]);

    const handlePageSizeChange = (e) => {
        setPageSize(e.target.value);
        setCurrentPage(0);
    }

    const handleSortDirectionChange = () => {
        sortDirection === 'ASC' ? setSortDirection('DESC') : setSortDirection('ASC');
    }

    let incomesjsx;
    if(incomes.length > 0){
        incomesjsx = incomes.map((income) => {
            return (<Income income = {income} onDelete={() => setDeleteIncome(Date.now())} key={income.incomeId}/>)
        });
    } else {
        incomesjsx = <NoElementsTableRow elementType={"Incomes"}/>
    }


    return ( 
    <>  
    <Container>
        <Link to={"/income/create"} className='form-style'>
            <Button variant='primary'>Create new</Button>
        </Link>
        <Row className='table-filter'>
            <Col className='table-filter--size'>
                <Form.Group as={Row}>
                    <Form.Label column>Page size:</Form.Label>
                    <Col>
                        <Form.Select 
                        id="pageSizeSelect" 
                        value={pageSize} 
                        onChange={handlePageSizeChange}
                        className='size--select'>
                            <option value = "10" selected="selected">10</option>
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
                    <th>Date</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {incomesjsx}
            </tbody>
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
    </> );
}

export default IncomeTable;