import { Formik } from 'formik';
import { useState, useContext } from 'react';
import { Container, Row, Form, Col, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../services/AuthContext';

const registerValidationSchema = Yup.object().shape({
      username: Yup.string()
        .min(3, 'Username is too short')
        .max(20, 'Username is too long')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password is too short')
        .max(30, 'Password is too long')
        .required('Password is required'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')
});

function RegisterForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const { register } = useContext(AuthContext);

  const handleRegister = (values, {resetForm}) => {
    register(values.username, values.password)
      .then(() => {
        resetForm();
        navigate('/income');
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
        setErrorMessage(error.response.data.message);
      });
  };
  return (
    <Container className='form-style'>
      <Row>
        <h3>Welcome Onboard</h3>
      </Row>
      {showError && (
        <Row> 
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            {errorMessage}
          </Alert>
        </Row>
      )}
      <Row>
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: ''
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleRegister(values, {resetForm});
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
          dirty
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                size='sm'
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && errors.username}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                size='sm'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='passwordConfirmation'
                size='sm'
                value={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.passwordConfirmation && errors.passwordConfirmation}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.passwordConfirmation}
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="form-buttons-container">
              <Col>
                <Button variant="primary" type="submit" disabled={!dirty} className='row-width-button'>Register</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      </Row>
      <Row className='login-register-prompt'>
        <Col>
            <span>
                Already registered? <Link to={'/login'}>Login</Link>
            </span>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterForm;