import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import SinglePost from "./pages/SinglePost";

const App = () => {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/posts/:id" component={SinglePost} />
      </Container>
    </Router>
  );
};

export default App;
