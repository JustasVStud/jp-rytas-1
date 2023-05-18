import { useEffect, useState } from 'react';
import { Container, Row, Spinner, Pagination, Button } from 'react-bootstrap';
import PageSizeSelect from '../PageSizeSelect';
import { getBudgets } from '../../services/Budget.service';
import BudgetTable from './BudgetTable';
import { Link } from 'react-router-dom';

function BudgetList() {
    const [budgets, setBudgets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                setIsLoading(true);
                const { content, totalPages } = await getBudgets(
                    currentPage,
                    pageSize
                );
                setBudgets(content);
                setTotalPages(totalPages);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchBudgets()
    }, [currentPage, pageSize]);

    const handlePageSizeChange = (selectedPageSize) => {
        setPageSize(selectedPageSize);
        setCurrentPage(0);
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    return ( 
        <Container>
            <Row className="table-filter">'
                <PageSizeSelect
                    pageSize={pageSize}
                    onPageSizeChange={handlePageSizeChange}
                />    
            </Row>

            {isLoading ? (
                <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            ) : (
                <BudgetTable budgets={budgets} onDeleteBudget={setBudgets} />
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

            <Link to={"/budget/create"} className='form-style'>
                <Button variant='primary'>Create new</Button>
            </Link>
        </Container>
    );
}

export default BudgetList;