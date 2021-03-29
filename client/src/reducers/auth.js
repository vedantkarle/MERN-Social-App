const authReducer = (
  state = {
    loginLoading: false,
    registerLoading: false,
    authData: null,
    loginError: null,
    registerError: null,
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loginLoading: true };
    case "REGISTER_REQUEST":
      return { ...state, registerLoading: true };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        loginLoading: false,
        registerLoading: false,
        authData: action?.payload,
        loginError: null,
        registerError: null,
      };
    case "LOGIN_FAIL":
      return { ...state, loginError: action?.payload };
    case "REGISTER_FAIL":
      return { ...state, registerError: action?.payload };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
