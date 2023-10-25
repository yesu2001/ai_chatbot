import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);
    try {
      toast.loading("Sign in...", { id: "login" });
      await auth?.login(email, password);
      toast.success("Logged in Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Sign in failed.", { id: "login" });
    }
  };
  return (
    <Box>
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            background: "#FFF",
          }}
        >
          <TextField
            type="email"
            name="email"
            variant="outlined"
            placeholder="Email"
            label="Email"
            sx={{ borderColor: "white" }}
          />
          <TextField
            type="password"
            name="password"
            variant="outlined"
            label="Password"
            placeholder="Password"
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
