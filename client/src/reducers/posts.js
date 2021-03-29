export default (
  state = { posts: [], error: null, post: null, message: null },
  action
) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, posts: action.payload };
    case "FETCH_ONE":
      return { ...state, post: action.payload };
    case "CREATE":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "CREATE_COMMENT":
      return { ...state, message: action.payload.message };
    case "DELETE":
      return { ...state, message: action.payload.message };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "CLEAR_MESSAGE":
      return { ...state, message: null };
    default:
      return state;
  }
};
