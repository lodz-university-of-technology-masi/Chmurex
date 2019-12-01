import React, { useState } from "react";
import { Redirect } from "react-router";
import { Button, FormGroup, FormControl, ControlLabel,  } from "react-bootstrap";
import "./Login.css";
import logo from './najlepszeLogo.png';
import { Auth } from "aws-amplify";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      // alert("Logged in");
      // return <Redirect push to="/recruiter" />;
      window.location.assign("/recruiter")
    } catch (e) {
      alert(e.message);
    }
  }

  return (
<div className="Login">
  <a>
    <img src={logo} className="logo" />
  </a>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel >Email</ControlLabel >
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

