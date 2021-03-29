import React, { useState, useEffect } from "react";
import { Card, Image, Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const Post = ({ post }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{post.username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${post._id}`}>
          {moment(post.createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      {user && (
        <Card.Content extra>
          <LikeButton post={post} user={user} />
          <Popup
            content="Comment on post"
            inverted
            trigger={
              <Button as={Link} labelPosition="right" to={`/posts/${post._id}`}>
                <Button color="blue" basic>
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {post.comments.length}
                </Label>
              </Button>
            }
          />
          {user && user.data.username === post.username && (
            <DeleteButton postId={post._id} />
          )}
        </Card.Content>
      )}
    </Card>
  );
};

export default Post;
