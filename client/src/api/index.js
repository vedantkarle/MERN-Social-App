import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).data.token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");

export const fetchSinglePost = (id) => API.get(`/posts/${id}`);

export const createPost = (post) => API.post("/posts", post);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.post(`/posts/${id}/like`);

export const createComment = (id, body) =>
  API.post(`/posts/${id}/comment`, body);

export const deleteComment = (postId, commentId) =>
  API.delete(`/posts/${postId}/comment/${commentId}`);

export const login = (formData) => API.post("/login", formData);

export const register = (formData) => API.post("/register", formData);
