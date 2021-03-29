import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { deletePost } from "../actions/posts";

const DeleteButton = ({ postId }) => {
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Popup
        content="Delete post"
        inverted
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(!confirmOpen)}
        onConfirm={() => dispatch(deletePost(postId))}
      />
    </>
  );
};

export default DeleteButton;
