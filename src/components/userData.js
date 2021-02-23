import React, { createContext } from "react";

export const userData = createContext();
export default class Context extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: undefined,
        name: "Test User",
        email: "sdasdasd",
        role: "",
        rights: [],
        jwt: "",
      },
      auth: false,
      loaded: false,
    };
  }

  isLogged() {
    this.setState({ loggedIn: true });
  }
  setUser(user, cb) {
    this.setState(
      {
        ...this.state,
        user: user,
      },
      () => {
        cb();
        console.log(this.state.user);
      }
    );
  }
  componentDidMount() {
    if (localStorage.getItem("jwt")) {
      this.setState((prevState) => ({
        ...prevState,
        auth: true,
        jwt: JSON.parse(localStorage.getItem("jwt")),
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        auth: true,
        loaded: true,
        user: {
          ...prevState.user,
          jwt: "test",
        },
      }));
    }
  }
  render() {
    return (
      <userData.Provider
        value={{ ...this.state, setUser: (user, cb) => this.setUser(user, cb) }}
      >
        {this.props.children}
      </userData.Provider>
    );
  }
}
