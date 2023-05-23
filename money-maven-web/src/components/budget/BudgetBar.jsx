import { Col, ProgressBar, Row } from 'react-bootstrap';

function BudgetBar({budget}) {
    const now = budget.budgetRemainder >= 0 ? budget.expenseAmount / budget.budgetAmount * 100 : 100;
    return ( 
        <div className='budget-bar'>
        <Row>
            <ProgressBar 
                now={now} 
                label={ now >= 10 ? `${now.toFixed(2)}%` : null}
                variant = {now === 100 ? 'danger' : now > 75 ? 'warning' : 'primary'}/>
        </Row>
        <Row>
            <Col className='budget-bar--expense'>
                <span>Spent: {budget.expenseAmount} &#x20AC;</span>
            </Col>
            <Col className='budget-bar--remaining'>
                <span>Remaining: {budget.budgetRemainder} &#x20AC;</span>
            </Col>
            <Col className='budget-bar--budget'>
                <span>Budget: {budget.budgetAmount} &#x20AC;</span>
            </Col>
        </Row>
        </div>
     );
}

export default BudgetBar;