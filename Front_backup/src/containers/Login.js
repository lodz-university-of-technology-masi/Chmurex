import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import "./Login.css";
import logo from './najlepszeLogo.png'

export default function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
<div className="Login">
  <a>
    <img src={logo} className="logo" />
  </a>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="login" bsSize="large">
          <FormLabel >Login</FormLabel >
          <FormControl
            autoFocus
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel >Password</FormLabel >
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button variant="primary" size="lg" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

