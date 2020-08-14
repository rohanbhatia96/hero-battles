import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/types/reducers";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../api/gqlQueries";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Query, QueryLoginArgs } from "../types/graphql";
import { Formik, FormikHelpers } from "formik";
import userLoginSchema from "../schemas/userLoginSchema";

interface FormValues {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const authToken = useSelector(
    (state: RootState) => state.loginStateReducer.authToken
  );
  const dispatch = useDispatch();
  const onCompleted = () => {
    dispatch({ type: "SET_AUTH_TOKEN", payload: data?.login.authToken });
    dispatch({ type: "SET_LOGIN_STATE", payload: true });
  };
  const onError = () => {
    //TODO: log error to the server
    console.log("Snap! Theres an error");
    console.log(error?.message);
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
    <>
      <Formik
        initialValues={initialFormValues}
        onSubmit={submitLoginForm}
        validationSchema={userLoginSchema}
      >
        {({ handleChange, handleSubmit, errors, isSubmitting, isValid }) => (
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
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            </Form.Group>
            <Button
              type="submit"
              disabled={isSubmitting || loading || !isValid}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {error && <p>error: {JSON.stringify(error.message)}</p>}
      <p>isLoggedIn(redux): {JSON.stringify(isLoggedIn)}</p>
      <p>authToken(redux): {JSON.stringify(authToken)}</p>
      <p>data: {JSON.stringify(data)}</p>
    </>
  );
};

export default LoginForm;
