import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import {FaCalendarAlt} from "react-icons/fa";
import moment from "moment";
import * as Yup from "yup";

const baseUrl = "http://localhost:8080/api/incomes";

const IncomeValidationSchema = Yup.object().shape({
    incomeAmount: Yup.number()
                .positive('Income amount cannot be negative')
                .moreThan(0, 'Ammount cannot be zero')
                .test(
                    'decimal-places',
                    'Invalid value',
                    (value) => /^\d+(?:\.\d{1,2})?$/.test(value.toString())
                )
                .required('Amount is required and must be a number'),
    incomeDescription: Yup.string()
                .max(255, 'Description is too long')
                .required('Description is required'),
    incomeDatetime: Yup.date()
                .typeError('Field is required')
                .required('Date is required')
});

function IncomeForm() {
  const navigate = useNavigate();

  return (
    <Container className="form-style">
      <Row>
                <h3 className="">Income</h3>
            </Row>
            <Row>
    <Formik
      initialValues={{
        incomeAmount: "",
        incomeDescription: "",
        incomeDatetime: ""
      }}
      validationSchema={IncomeValidationSchema}
      onSubmit={(values, { resetForm }) => {
        values.incomeDatetime = moment(values.incomeDatetime).format('YYYY-MM-DDTHH:mm:ss');
        axios.post
        (baseUrl, values)
          .then((response) => {
            console.log(response.data)
            resetForm()
            navigate("/income");
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
        dirty }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="1000 &#x20AC;"
              name="incomeAmount"
              size="sm"
              value={values.incomeAmount}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.incomeAmount && errors.incomeAmount}
            />
            <Form.Control.Feedback type = "invalid">
              {errors.incomeAmount}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Decription</Form.Label>
            <Form.Control
              type="text"
              placeholder="Source of Income"
              name="incomeDescription"
              size="sm"
              value={values.incomeDescription}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.incomeDesciption && errors.incomeDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.incomeDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <DateTimePicker
                value={values.incomeDatetime}
                name="incomeDatetime"
                format="yyyy-MM-dd HH:mm"
                className={`form-control ${touched.incomeDatetime && errors.incomeDatetime ? 'is-invalid': ''}`}
                calendarIcon={<FaCalendarAlt/>}
                disableClock={true}
                yearPlaceholder="YYYY"
                monthPlaceholder="MM"
                dayPlaceholder="DD"
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                onChange={(value) => setFieldValue('incomeDatetime', value)}
                />
                {touched.incomeDatetime && errors.incomeDatetime && (
                  <Form.Control.Feedback type="invalid">
                    {errors.incomeDatetime}
                  </Form.Control.Feedback>
                )}
          </Form.Group>

          <Row className="form-buttons-container">
            <Col>
              <Button
                variant="primary"
                type="submit"
                disabled={!dirty}
              >
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
export default IncomeForm;