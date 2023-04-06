import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";


const baseUrl = "http://localhost:8080/api/incomes/";


function IncomeForm() {

  let { id } = useParams();
  let [existingIncome, setExistingIncome] = useState({
    incomeAmount: 0.0,
    incomeDescription: "",
    incomeDatetime: "",
  });

  useEffect(() => {
    axios.get(baseUrl + id)
      .then((response) => setExistingIncome(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  return (
    <Container>
      <Row>
                <h3 className="">Income</h3>
            </Row>
            <Row>
    <Formik
      initialValues={existingIncome}
      onSubmit={(values, { resetForm }) => {
        console.log(values)
        axios.patch(baseUrl + id, values)
          .then((response) => {console.log(response.data)
            resetForm()
            navigate("/income");
          })
          .catch((err) => console.log(err));
      }}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, handleSubmit, dirty }) => (
        <Form onSubmit={handleSubmit} style={{ margin: "100px" }}>
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
            />
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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="1900-01-01"
              name="incomeDatetime"
              size="sm"
              value={values.incomeDatetime}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>

          <Row>
            <Col>
              <Button
                variant="secondary"
                type="submit"
                style={{ marginTop: "10px" }}
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
