import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { getExpense , patchExpense } from '../../services/Expense.service';
import { getExpenseTypes } from '../../services/Expense_type.service';

const ExpenseEditValidationSchema = Yup.object().shape({
  expenseAmount: Yup.number()
    .positive("Expense amount cannot be negative")
    .moreThan(0, "Ammount cannot be zero")
    .test("decimal-places", "Invalid value", (value) =>
      /^\d+(?:\.\d{1,2})?$/.test(value.toString())
    )
    .required("Amount is required and must be a number"),
  expenseDescription: Yup.string()
    .max(255, "Description is too long"),
  expenseDatetime: Yup.date()
    .typeError("Field is required")
    .required("Date is required"),
});

function ExpenseEditForm() {
  const navigate = useNavigate();
  const [expenseTypes, setExpenseTypes] = useState([]); 
  
  let { id } = useParams();
  let [existingExpense, setExistingExpense] = useState({
    expenseAmount: "",
    expenseDescription: "",
    expenseDatetime: "",
    expenseTypeName: "",
  });

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await getExpense(id)
        setExistingExpense(response);
      } catch (error) {
        console.log(error);
        if(error.response.status === 401){
          navigate('/profile');
        }
      }  
    };
  
    fetchExpense();
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

  return (
    <Container className="form-style">
      <Row>
        <h3 className="">Edit Expense</h3>
      </Row>
      <Row>
        <Formik
          initialValues={existingExpense}
          validationSchema={ExpenseEditValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              values.expenseDatetime = moment(values.expenseDatetime).format('YYYY-MM-DDTHH:mm:ss');
              await patchExpense(id, values);
              resetForm();
              navigate('/expense');
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
            setFieldValue,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit} className="form">
              <Form.Group className="mb-3">
                <Form.Label>Expense Type</Form.Label>
                <Form.Control
                  as="select"
                  name="expenseTypeName"
                  size="sm"
                  value={values.expenseTypeName}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  {expenseTypes.map((expenseType) => (
                    <option
                      key={expenseType.typeId}
                      value={expenseType.typeName}
                    >
                      {expenseType.typeName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
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
                  isInvalid={
                    touched.expenseDescription && errors.expenseDescription
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.expenseDescription}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date and Time</Form.Label>
                <DateTimePicker
                  value={values.expenseDatetime}
                  name="expenseDatetime"
                  format="yyyy-MM-dd HH:mm"
                  className={`form-control ${
                    touched.expenseDatetime && errors.expenseDatetime
                      ? "is-invalid"
                      : ""
                  }`}
                  calendarIcon={<FaCalendarAlt />}
                  disableClock={true}
                  yearPlaceholder="YYYY"
                  monthPlaceholder="MM"
                  dayPlaceholder="DD"
                  hourPlaceholder="hh"
                  minutePlaceholder="mm"
                  onChange={(value) => setFieldValue("expenseDatetime", value)}
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
                    Update
                  </Button>
                </Col>
                <Col>
                  <Link to={"/expense"}>
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

export default ExpenseEditForm;
