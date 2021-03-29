import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { deleteComment } from "../actions/posts";

const DeleteButton = ({ postId, commentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Popup
        content="Delete comment"
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
        onConfirm={() => {
          dispatch(deleteComment(postId, commentId));
          history.push("/");
        }}
      />
    </>
  );
};

export default DeleteButton;
