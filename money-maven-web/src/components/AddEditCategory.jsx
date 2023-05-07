import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const baseUrl = "http://localhost:8080/api/expenseTypes";

const CategoryValidationSchema = Yup.object().shape({
  typeName: Yup.string()
    .max(25, "Category name is too long")
    .required("Category name is required"),
});

function AddEditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [existingCategory, setExistingCategory] = useState({
    typeName: ""
  });
  
  const [errorMsg, setErrorMsg] = useState("");
  const token = JSON.parse(localStorage.getItem('user'));
  const source = axios.CancelToken.source();

  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token.accssToken}`
          },
          cancelToken: source.token
        })
        .then((response) => setExistingCategory(response.data))
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.log(err);
          }
        });
    }
  }, [id, token, source]);

  let categorySubmission = (values, { resetForm }) => {
    const { id, ...data } = values;
    const url = id ? `${baseUrl}/${id}` : baseUrl;
    const method = id ? "put" : "post";
    
    axios[method](url, data, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      },
      cancelToken: source.token
    })
      .then((res) => {

        if (categorySubmission) {
          setErrorMsg("");
          resetForm();
          navigate("/category");
        }
        
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          setErrorMsg("Category with the same name already exists");
        } else {
          setErrorMsg("Error saving category");
        }
        if (!axios.isCancel(err)) {
          console.log(err);
        }
      },[categorySubmission]);
  }
  

  return (
    <Container className="form-style">
      <Row>
        <h3 className="">{existingCategory.typeName ? "Edit" : "Create"} Category</h3>
      </Row>
      {errorMsg ? (
        <Row>
          <div className="alert alert-danger">{errorMsg}</div>
        </Row>
      ) : null}
      <Row>
        <Formik
          initialValues={existingCategory}
          validationSchema={CategoryValidationSchema}
          onSubmit={categorySubmission}
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
            <Form onSubmit={handleSubmit} className="form">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category name"
                  name="typeName"
                  size="sm"
                  value={values.typeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.typeName && errors.typeName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.typeName}
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="form-buttons-container">
                <Col> 
                
                   <Button variant="primary" type="submit" disabled={!dirty}>
                    {id ? "Update" : "Create"}</Button>
                    
                   <Link to={"/category/"}>
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

export default AddEditCategory
