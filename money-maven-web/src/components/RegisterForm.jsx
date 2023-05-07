import { Formik } from 'formik';
import React from 'react';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import authService from '../services/auth.service';

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
  return (
    <Container>
      <Row>
        <h3>Welcome Onboard</h3>
      </Row>
      <Row>
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: ''
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values, {resetForm}) => {
          authService.register(values.username, values.password).then(() => {
            resetForm()
            navigate('/login')
          })
          .catch((err) => console.log(err))
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
                type='passwordConfirmation'
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
                <Button variant="primary" type="submit" disabled={!dirty}>Register</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      </Row>
      <Row>
        <Col>
            <span>
                Already registered?
            </span>
            <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterForm;