import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../actions/auth";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values, history));
  };

  const { loginLoading, loginError } = useSelector((state) => state.auth);

  return (
    <div className="form-container">
      <Form
        noValidate
        onSubmit={onSubmit}
        className={loginLoading && !loginError ? "loading" : ""}
      >
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {loginError && <div className="ui error message">{loginError}</div>}
    </div>
  );
};

export default Login;
