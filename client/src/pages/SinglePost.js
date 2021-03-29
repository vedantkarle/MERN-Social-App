import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getSinglePost, createComment } from "../actions/posts";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import DeleteCommentButton from "../components/DeleteCommentButton";
import toast, { Toaster } from "react-hot-toast";

import {
  Loader,
  Dimmer,
  Grid,
  Image,
  Card,
  Icon,
  Button,
  Label,
  Form,
  Container,
} from "semantic-ui-react";

const SinglePost = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const [body, setBody] = useState({ body: "" });

  const onChange = (e) => {
    setBody({ body: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("profile"));

  const { post, error, message } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getSinglePost(id));
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  let postMarkup;

  if (!post) {
    postMarkup = (
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    );
  } else {
    postMarkup = (
      <Grid>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ style: { fontSize: "14px" } }}
        />
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{post.username}</Card.Header>
                <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{post.body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={post} />
                <Button as="div" labelPosition="right">
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {post.comments.length}
                  </Label>
                </Button>
                {user && user.data.username === post.username && (
                  <DeleteButton postId={post._id} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Container style={{ padding: "20px" }}>
                  <p>Post a comment</p>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(createComment(post._id, body));
                    }}
                  >
                    <Form.Field>
                      <Form.Input
                        placeholder="Add comment..."
                        name="body"
                        value={body.body}
                        onChange={onChange}
                      />
                      <Button type="submit" color="teal">
                        Submit
                      </Button>
                    </Form.Field>
                  </Form>
                </Container>
              </Card>
            )}
            {post.comments &&
              post.comments.map((comment) => {
                return (
                  <Card key={comment._id} fluid>
                    <Card.Content>
                      {user && user.data.username === comment.username && (
                        <DeleteCommentButton
                          postId={post._id}
                          commentId={comment._id}
                        />
                      )}
                      <Card.Header>{comment.username}</Card.Header>
                      <Card.Meta>
                        {moment(comment.createdAt).fromNow()}
                      </Card.Meta>
                      <Card.Description>{comment.body}</Card.Description>
                    </Card.Content>
                  </Card>
                );
              })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export default SinglePost;
