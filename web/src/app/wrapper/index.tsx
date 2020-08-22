import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import Character from "../pages/Character";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error404 from "../pages/404";
import Battle from "../pages/Battle";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/reducers";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const Wrapper: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  return (
    <BrowserRouter>
      <Container fluid className="d-flex flex-column min-vh-100">
        <Row className="sticky-top">
          <Header />
        </Row>
        <Row className="flex-grow-1">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/character/:id/:fetchFrom?"
              exact
              component={Character}
            />
            <Route path="/login" exact>
              {isLoggedIn ? <Redirect to="/battle" /> : <Login />}
            </Route>
            <Route path="/register" exact>
              {isLoggedIn ? <Redirect to="/battle" /> : <Register />}
            </Route>
            <Route path="/battle" exact>
              {!isLoggedIn ? <Redirect to="/login" /> : <Battle />}
            </Route>
            <Route path="/" component={Error404} />
          </Switch>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default Wrapper;
