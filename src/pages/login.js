import React, { useState, useContext, useEffect } from "react";
import { userData } from "../components/userData";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const { setUser } = useContext(userData);
  const data = useContext(userData);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [from, setFrom] = useState("/");
  useEffect(() => {
    if (props.location.state) {
      if (props.location.state.from.pathname) {
        setFrom(props.location.state.from.pathname);
      }
    }
  });
  // if(props.location.state){
  //     if(props.location.state.from.pathname !== "/login"){
  //         from = props.location.state.pathname
  //     }

  // }

  const validateForm = () => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      return false;
    } else if (pwd.length < 5) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email: " + email);
    console.log("Password: " + pwd);
    if (validateForm()) {
      setUser(
        {
          id: 20,
          name: "Tadeáš Simandl",
          email: email,
          role: "",
          rights: ["admin", "user"],
        },
        () => {
          console.log("ge");
        }
      );

      console.log("valid!");
    }
    localStorage.setItem("authToken", 12345678);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 20,
        name: "Tadeáš Simandl",
        email: email,
      })
    );
  };
  return localStorage.getItem("authToken") ? (
    <Redirect to={from} />
  ) : (
    <React.Fragment></React.Fragment>
  );
};
const LoginTest = () => {
  return <h1>Login</h1>;
};
export default LoginTest;
