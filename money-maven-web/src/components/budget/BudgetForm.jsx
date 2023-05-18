import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { getExpenseTypes } from '../../services/Expense_type.service';
import { createBudget } from '../../services/Budget.service';

const budgetValidationSchema = Yup.object().shape({
    expenseTypeName: Yup.string().required('Expense type is required'),
    budgetAmount: Yup.number()
        .positive('Budget amount cannot be negative')
        .max(9999999999.99, 'Amount exeeds maximum allowed value')
        .test('decimal-places', 'Invalid value', (value) =>
        /^\d{1,10}(?:\.\d{1,2})?$/.test(value.toString())
        )
        .required('Amount is required and must be a number')
});

function BudgetForm() {
    const navigate = useNavigate();
    const [expenseTypes, setExpenseTypes] = useState([]);

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

      const expenseTypeOptions = expenseTypes.map((expenseType) => (
        <option key={expenseType.typeId} value={expenseType.typeName}>
          {expenseType.typeName}
        </option>
      ));

    return ( 
        <Container className='form-style'>
            <Row>
                <Formik
                    initialValues={{
                        expenseTypeName: '',
                        budgetAmount: '',
                    }}
                    validationSchema={budgetValidationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            await createBudget(values);
                            resetForm();
                            navigate('/budget');
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    enableReinitialize
                > 
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    dirty,
                }) => (
                    <Form onSubmit={handleSubmit} className='form'>
                        <Form.Group className='mb-3'>
                            <Form.Label>Expense Type</Form.Label>
                            <Form.Select
                                name='expenseTypeName'
                                size='sm'
                                value={values.expenseTypeName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.expenseTypeName && errors.expenseTypeName}
                            >
                                <option>Select expense type</option>
                                {expenseTypeOptions}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>
                                {errors.expenseTypeName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="1000 &#x20AC;"
                                name="budgetAmount"
                                size="sm"
                                value={values.budgetAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.budgetAmount && errors.budgetAmount}
                            />
                            <Form.Control.Feedback type = "invalid">
                            {errors.budgetAmount}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="form-buttons-container">
                            <Col>
                                <Button variant="primary" type="submit" disabled={!dirty}>Submit</Button>
                            </Col>
                            <Col>
                                <Link to={"/budget"}>
                                    <Button variant="primary">Cancel</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                )}
                </Formik>
            </Row>
        </Container>
    );
}
export default BudgetForm;