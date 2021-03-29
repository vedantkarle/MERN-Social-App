import * as api from "../api";

export const register = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });

    const { data } = await api.register(formData);

    dispatch({ type: "AUTH_SUCCESS", payload: data });

    history.push("/");
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const { data } = await api.login(formData);

    dispatch({ type: "AUTH_SUCCESS", payload: data });

    history.push("/");
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
