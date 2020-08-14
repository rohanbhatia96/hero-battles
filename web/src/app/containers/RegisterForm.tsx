import { useMutation, ApolloError } from "@apollo/client";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_USER } from "../api/gqlQueries";
import { RootState } from "../store/types/reducers";
import { Mutation, MutationRegisterArgs } from "../types/graphql";

interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
}
const RegisterForm: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const authToken = useSelector(
    (state: RootState) => state.loginStateReducer.authToken
  );
  const dispatch = useDispatch();
  const onCompleted = (receivedData: Mutation) => {
    console.log("success");
    console.log(JSON.stringify(receivedData));
    dispatch({
      type: "SET_AUTH_TOKEN",
      payload: receivedData.register.authToken,
    });
    dispatch({ type: "SET_LOGIN_STATE", payload: true });
  };
  const onError = (receivedError: ApolloError) => {
    //TODO: log error to the server
    console.log("Snap! Theres an error");
    console.log(receivedError);
  };
  const initialFormValues: FormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };
  const [register, { data, error, loading }] = useMutation<
    Mutation,
    MutationRegisterArgs
  >(REGISTER_USER, {
    onCompleted,
    onError,
  });
  const submitLoginForm = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    register({ variables: values });
    actions.setSubmitting(false);
  };
  return (
    <>
      <Formik
        initialValues={initialFormValues}
        onSubmit={submitLoginForm}
        //validationSchema={userLoginSchema}
      >
        {({ handleChange, handleSubmit, errors, isSubmitting, isValid }) => (
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
                &#x200B;{errors.email}
              </Form.Text>
            </Form.Group>

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

export default RegisterForm;
