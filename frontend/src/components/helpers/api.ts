import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", {
    email: email,
    password: password,
  });
  if (res.status !== 201) {
    throw new Error("Unable to login!");
  }
  const data = await res.data;
  console.log("data", data);
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 201) {
    throw new Error("Unable to login!");
  }
  const data = await res.data;
  console.log("data", data);
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chats/new", { message });
  if (res.status !== 201) {
    throw new Error("Unable to send chat!");
  }
  const data = await res.data;
  console.log("data", data);
  return data;
};
