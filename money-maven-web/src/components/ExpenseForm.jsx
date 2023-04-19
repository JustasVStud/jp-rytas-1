import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import {FaCalendarAlt} from "react-icons/fa";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import * as Yup from "yup";


const baseUrl = "http://localhost:8080/api/expenses";

 
const ExpenseValidationSchema = Yup.object().shape({
  expenseAmount: Yup.number()
  .positive('Income amount cannot be negative')
  .moreThan(0, 'Ammount cannot be zero')
  .test(
      'decimal-places',
      'Invalid value',
      (value) => /^\d+(?:\.\d{1,2})?$/.test(value.toString())
  )
  .required('Amount is required and must be a number'),
  expenseDescription: Yup.string()
              .max(255, 'Description is too long')
              .required('Description is required'),
  expenseDatetime: Yup.date()
              .typeError('Field is required')
              .required('Date is required')
});

function ExpenseForm(props) {
  // const { categories } = props;
  const navigate = useNavigate();
  
  return (
    <Container className="form-style">

      <Row>
        <Formik
          initialValues={{
            expenseAmount: "",
            expenseDescription: "",
            expenseTypeName: "",
            expenseDatetime: ""
          }}
          validationSchema={ExpenseValidationSchema}
      onSubmit={(values, { resetForm }) => {
        values.expenseDatetime = moment(values.expenseDatetime).format('YYYY-MM-DDTHH:mm:ss');
        axios.post(baseUrl, values)
          .then((response) => {
            console.log(response.data)
            resetForm()
            navigate("/expense");
          })
          .catch((err) => console.log(err));
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
            setFieldValue,
            dirty
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1000 &#x20AC;"
                  name="expenseAmount"
                  size="sm"
                  value={values.expenseAmount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.expenseAmount && errors.expenseAmount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.expenseAmount}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Decription</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Source of Expense"
                  name="expenseDescription"
                  size="sm"
                  value={values.expenseDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.expenseDesciption && errors.expenseDescription}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.expenseDescription}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Source of Type"
                  name="eexpenseTypeName"
                  size="sm"
                  value={values.eexpenseTypeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.expenseTypeName && errors.expenseTypeName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.eexpenseTypeName}
                </Form.Control.Feedback>
              </Form.Group>
            
            
            <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <DateTimePicker
                value={values.expenseDatetime}
                name="expenseDatetime"
                format="yyyy-MM-dd HH:mm"
                className={`form-control ${touched.expenseDatetime && errors.expenseDatetime ? 'is-invalid': ''}`}
                calendarIcon={<FaCalendarAlt/>}
                disableClock={true}
                yearPlaceholder="YYYY"
                monthPlaceholder="MM"
                dayPlaceholder="DD"
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                onChange={(value) => setFieldValue('expenseDatetime', value)}
                />
                {touched.expenseDatetime && errors.expenseDatetime && (
                  <Form.Control.Feedback type="invalid">
                    {errors.expenseDatetime}
                  </Form.Control.Feedback>
                )}
          </Form.Group>
          
        <Row className="form-buttons-container">
          <Col>
            <Button variant="primary" type="submit" disabled={!dirty}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      )}
     </Formik>
     </Row>    
   </Container>
  );
}

export default ExpenseForm;
