import { ApolloError, useMutation } from "@apollo/client";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { REGISTER_USER } from "../api/gqlQueries";
import userRegisterSchema from "../schemas/userRegisterSchema";
import { Mutation, MutationRegisterArgs } from "../types/graphql";

interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterForm: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsModal(false);
  };
  const [errorMsg, setErrorMsg] = useState<string>("");
  const dispatch = useDispatch();
  const onCompleted = (receivedData: Mutation) => {
    dispatch({
      type: "SET_AUTH_TOKEN",
      payload: receivedData.register.authToken,
    });
    dispatch({ type: "SET_LOGIN_STATE", payload: true });
  };
  const onError = (receivedError: ApolloError) => {
    setErrorMsg(JSON.stringify(receivedError.message));
    setIsModal(true);
    //TODO: log error to the server
  };
  const initialFormValues: FormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [register, { loading }] = useMutation<Mutation, MutationRegisterArgs>(
    REGISTER_USER,
    {
      onCompleted,
      onError,
    }
  );
  const submitRegisterForm = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    register({ variables: values });
    actions.setSubmitting(false);
  };
  return (
    <Col xs={12}>
      <Col xs={12} className="form-container py-4 px-4">
        <Col xs={12} className="text-center">
          <p className="login-upper-header">Superhero Battles</p>
          <p className="login-upper-subtext">Create New Account</p>
        </Col>
        <Col xs={12} className="py-3">
          <Formik
            initialValues={initialFormValues}
            onSubmit={submitRegisterForm}
            validationSchema={userRegisterSchema}
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
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="Enter Name"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">
                    &#x200B;{errors.name}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="Enter username"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">
                    &#x200B;{errors.username}
                  </Form.Text>
                </Form.Group>

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

                <Form.Group controlId="confirm-password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password again"
                    onChange={handleChange}
                    name="confirmPassword"
                  />
                  <Form.Text className="text-danger">
                    &#x200B;{errors.confirmPassword}
                  </Form.Text>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={isSubmitting || loading || !isValid}
                  block
                >
                  <span className="login-button-text">Create Account</span>
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Col>
      <Col xs={12}>
        <Modal
          show={isModal}
          onHide={() => {
            setIsModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Snap! There's an error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMsg}</Modal.Body>
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

export default RegisterForm;
