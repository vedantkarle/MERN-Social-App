import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { createPost } from "../actions/posts";

const PostForm = () => {
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const onChange = (e) => {
    setBody(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPost({
        body,
        username: user.data.username,
        createdAt: new Date().toISOString(),
      })
    );

    setBody("");
  };

  return (
    <>
      <Form noValidate onSubmit={onSubmit}>
        <h3>Create a post:</h3>
        <Form.Field>
          <Form.Input
            label="Body"
            placeholder="Body"
            name="body"
            value={body}
            onChange={onChange}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </>
  );
};

export default PostForm;
