import React, { useEffect } from "react";
import Post from "../components/Post";
import { getPosts } from "../actions/posts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Loader, Dimmer, Grid, Transition } from "semantic-ui-react";

const Posts = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  });

  return (
    <>
      {!posts.length ? (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <Transition.Group>
          {posts &&
            posts.map((post) => {
              return (
                <Grid.Column key={post._id} style={{ marginBottom: "20px" }}>
                  <Post post={post} />
                </Grid.Column>
              );
            })}
        </Transition.Group>
      )}
    </>
  );
};

export default Posts;
