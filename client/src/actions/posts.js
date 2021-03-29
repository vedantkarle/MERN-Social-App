import * as api from "../api";

//Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchSinglePost(id);

    dispatch({ type: "FETCH_ONE", payload: data });
    dispatch({ type: "CLEAR_ERROR" });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
    dispatch({ type: "CLEAR_ERROR" });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: "CLEAR_ERROR" });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);

    dispatch({ type: "DELETE", payload: data });
    dispatch({ type: "CLEAR_ERROR" });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: "CLEAR_ERROR" });
  }
};

export const createComment = (id, body) => async (dispatch) => {
  try {
    const { data } = await api.createComment(id, body);
    dispatch({ type: "CREATE_COMMENT", payload: data });
    dispatch({ type: "CLEAR_MESSAGE" });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(postId, commentId);
    dispatch({ type: "DELETE", payload: data });
    dispatch({ type: "CLEAR_ERROR" });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
