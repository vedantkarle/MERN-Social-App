import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader, Dimmer, Grid } from "semantic-ui-react";
import PostForm from "../components/PostForm";
import Posts from "../components/Posts";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { error, message } = useSelector((state) => state.posts);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message, user]);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { fontSize: "14px" } }}
      />
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          <Posts />
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Home;
