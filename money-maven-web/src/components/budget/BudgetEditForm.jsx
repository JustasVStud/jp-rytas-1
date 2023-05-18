import * as Yup from 'yup';
import  Form  from 'react-bootstrap/Form';
import  Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBudget, patchBudget } from '../../services/Budget.service';
import { getExpenseTypes } from '../../services/Expense_type.service';
import { Container, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';

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

function BudgetEditForm() {
    const navigate = useNavigate();
    const [expenseTypes, setExpenseTypes] = useState([]);

    let { id } = useParams();
    let [existingBudget, setExistingBudget] = useState({
        expenseTypeName: '',
        budgetAmount: ''
    });

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await getBudget(id)
                setExistingBudget(response);
            } catch (error) {
                console.log(error);
                if(error.response.status === 401){
                    navigate('/profile');
                }
            }
        };

        fetchBudget();
    }, [id, navigate]);

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
                    initialValues={existingBudget}
                    validationSchema={budgetValidationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            await patchBudget(id, values);
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
                                <Button variant="primary" type="submit" disabled={!dirty}>Update</Button>
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

export default BudgetEditForm;