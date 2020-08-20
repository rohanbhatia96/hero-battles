import { useLazyQuery } from "@apollo/client";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../api/gqlQueries";
import userLoginSchema from "../schemas/userLoginSchema";
import { Query, QueryLoginArgs } from "../types/graphql";

interface FormValues {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsModal(false);
  };
  const dispatch = useDispatch();
  const onCompleted = () => {
    dispatch({ type: "SET_AUTH_TOKEN", payload: data?.login.authToken });
    dispatch({ type: "SET_LOGIN_STATE", payload: true });
  };
  const onError = () => {
    //TODO: log error to the server
    console.log("Snap! Theres an error");
    console.log(error?.message);
    setIsModal(true);
  };
  const initialFormValues: FormValues = {
    email: "",
    password: "",
  };
  const [login, { data, error, loading }] = useLazyQuery<Query, QueryLoginArgs>(
    LOGIN_USER,
    {
      onCompleted,
      onError,
    }
  );
  const submitLoginForm = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    login({ variables: { email: values.email, password: values.password } });
    actions.setSubmitting(false);
  };
  return (
    <Col xs={12}>
      <Col xs={12} className="form-container py-4 px-4">
        <Col xs={12} className="text-center">
          <p className="login-upper-header">Superhero Battles</p>
          <p className="login-upper-subtext">Sign in to continue</p>
        </Col>
        <Col xs={12} className="py-3">
          <Formik
            initialValues={initialFormValues}
            onSubmit={submitLoginForm}
            validationSchema={userLoginSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              isSubmitting,
              isValid,
            }) => (
              <Form
                noValidate
                onSubmit={(e) => {
                  handleSubmit(e as any);
                }}
              >
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">
                    &#x200B;{errors.email}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">
                    &#x200B;{errors.password}
                  </Form.Text>
                </Form.Group>
                <Button
                  type="submit"
                  disabled={isSubmitting || loading || !isValid}
                  block
                >
                  <span className="login-button-text">Sign In</span>
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Col>
      <Col xs={12} className="my-4 text-center">
        <Link to="/register">Don't have an account? Register here.</Link>
      </Col>
      <Col xs={12}>
        <Modal show={isModal}>
          <Modal.Header closeButton>
            <Modal.Title>Snap! There's an error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error?.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Try Again
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Col>
  );
};

export default LoginForm;
