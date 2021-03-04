// testing app
import React from "react";
//import * as data from './backend/config.json';
//import { MDBBtn } from 'mdbreact';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//nav
import LayOut from "./components/design/layout";
import { PrivateRoute } from "./components/privateroutes";
// import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
// context
import Context from "./components/userData";
import "./index.css";
import { Dodavky } from "./pages/dodavky";
import { Home } from "./pages/home";
// pages
import Login from "./pages/login";
import Objednavky from "./pages/objednavky/index";
import { Tender } from "./pages/tender/index";
import { NotFound } from "./pages/notfound";
import { ExcelConverter } from "./components/modules/excel-converter";
import { Test } from "./pages/test";
import Projects from "./pages/projects/index";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLogged: true,
    };
    this.logout = this.logout.bind(this);
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    this.setState({
      isLogged: false,
    });
  }
  // componentDidMount() {
  //   if (localStorage.getItem("authKey") || localStorage.getItem("user")) {
  //     if (!isAuth()) {
  //       this.logout();
  //     }
  //   }
  //   if (localStorage.getItem("authToken")) {
  //     this.setState({ isLogged: true })
  //   }
  // }
  render() {
    if (!this.state.isLogged) {
      console.log("hey");
    }
    return (
      <Context isLogged={this.state.isLogged}>
        <Router>
          <LayOut>
            {/* <Container maxWidth="lg"> */}
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/logout" />
              <PrivateRoute path="/dodavky" component={Dodavky} />
              <PrivateRoute path="/objednavky" component={Objednavky} />
              <PrivateRoute path="/test" component={Test} />
              <PrivateRoute path="/tender" component={Tender} />
              <PrivateRoute path="/converter" component={ExcelConverter} />
              <PrivateRoute path="/projekty" component={Projects} />
              <PrivateRoute component={NotFound} />
            </Switch>
            {/* </Container> */}
          </LayOut>
        </Router>
      </Context>
    );
  }
}

export default App;
