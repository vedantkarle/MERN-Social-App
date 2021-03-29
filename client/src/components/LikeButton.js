import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likePost } from "../actions/posts";
import { Button, Icon, Label, Popup } from "semantic-ui-react";

const LikeButton = ({ post, user }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (
      user &&
      post.likes.find((like) => like.username === user.data.username)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, post.likes]);

  const dispatch = useDispatch();

  const likeButton = user ? (
    liked ? (
      <Popup
        content="Unlike post"
        inverted
        trigger={
          <Button color="teal">
            <Icon name="heart" />
          </Button>
        }
      />
    ) : (
      <Popup
        content="Like post"
        inverted
        trigger={
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        }
      />
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button
      as="div"
      labelPosition="right"
      onClick={() => dispatch(likePost(post._id))}
    >
      {likeButton}
      <Label basic color="teal" pointing="left">
        {post.likes.length}
      </Label>
    </Button>
  );
};

export default LikeButton;
