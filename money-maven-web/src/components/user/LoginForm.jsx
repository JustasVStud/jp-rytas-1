import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Container, Row, Form, Col, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../services/AuthContext';

const loginValidationSchema = Yup.object().shape({
      username: Yup.string()
        .min(3, 'Username is too short')
        .max(20, 'Username is too long')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password is too short')
        .max(30, 'Password is too long')
        .required('Password is required')
});

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = (values, {resetForm}) => {
    login(values.username, values.password)
      .then(() => {
        resetForm();
        navigate('/income');
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
        setErrorMessage('Username or password incorrect');
      });
  };

  return (
    <Container className='form-style'>
      <Row>
        <h3>Login to Your Account</h3>
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
          password: ''
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values, {resetForm});
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
          <Form onSubmit={handleSubmit} className='form'>
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
            <Row className="form-buttons-container">
              <Col>
                <Button variant="primary" type="submit" disabled={!dirty} className='row-width-button'>Login</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      </Row>
      <Row className='login-register-prompt'>
        <Col>
          <span>Not registered yet? <Link to={'/register'}>Create an Account</Link></span>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm