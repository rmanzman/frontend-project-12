import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Navbar,
  Row,
  Image,
} from 'react-bootstrap';
import cardImage from '../../assets/cardImage.jpg';
import { useAuth } from '../../context/authProvider';

const SignupPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const auth = useAuth();
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
    input.current.select();
  }, [authFailed]);

  const validationSchema = yup.object().shape({
    username: yup.string().trim().required(t('required')),
    password: yup.string().trim().required(t('required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        await auth.signup(values);
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 409) {
          setAuthFailed(true);
        }
      }
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    setAuthFailed(false);
  };

  const isUsernameInvalid = formik.errors.username && formik.touched.username;
  const isPasswordInvalid = formik.errors.password && formik.touched.password;

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
        <Container>
          <Navbar.Brand href="/">Учебный проект &quot;ЧАТ&quot;</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-5 row">
                <Col
                  xs={12}
                  md={6}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Image
                    src={cardImage}
                    className="roundedCircle"
                    alt={t('registration')}
                  />
                </Col>
                <Form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">{t('signup')}</h1>
                  <fieldset disabled={formik.isSubmitting}>
                    <Form.Group
                      className="mb-3 form-floating"
                      controlId="username"
                    >
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          handleChange(e);
                          formik.handleChange(e);
                        }}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        placeholder={t('username')}
                        autoComplete="username"
                        required
                        ref={input}
                        isInvalid={authFailed || isUsernameInvalid}
                      />
                      <Form.Label>{t('username')}</Form.Label>
                      <Form.Control.Feedback
                        type="invalid"
                        className="invalid-feedback"
                      >
                        {formik.errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-4 form-floating"
                      controlId="password"
                    >
                      <Form.Control
                        type="password"
                        onChange={(e) => {
                          handleChange(e);
                          formik.handleChange(e);
                        }}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        placeholder={t('password')}
                        autoComplete="current-password"
                        isInvalid={authFailed || isPasswordInvalid}
                        required
                      />
                      <Form.Label>{t('password')}</Form.Label>
                      <Form.Control.Feedback
                        type="invalid"
                        className="invalid-feedback"
                      >
                        {formik.errors.password || t('invalidData')}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-4 form-floating"
                      controlId="password"
                    >
                      <Form.Control
                        type="password"
                        onChange={(e) => {
                          handleChange(e);
                          formik.handleChange(e);
                        }}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        placeholder={t('password')}
                        autoComplete="passwordConfirmation"
                        isInvalid={authFailed || isPasswordInvalid}
                        required
                      />
                      <Form.Label>{t('signupPage.confirmPassword')}</Form.Label>
                      <Form.Control.Feedback
                        type="invalid"
                        className="invalid-feedback"
                      >
                        {formik.errors.password || t('invalidData')}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      className="w-100 mb-3"
                      variant="primary"
                      type="submit"
                    >
                      {t('signupPage.signup')}
                    </Button>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
