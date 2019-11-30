import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel,  } from "react-bootstrap";
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
          <ControlLabel >Login</ControlLabel >
          <FormControl
            autoFocus
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel >Password</ControlLabel >
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

