import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import NavLink from "./shared/Nav";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Box>
          {auth?.isLoggedIn ? (
            <>
              <NavLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavLink
                bg="#51538f"
                to="/"
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
                onClick={auth?.login}
              />
              <NavLink
                bg="#51538f"
                to="/signup"
                text="SignUp"
                textColor="white"
                onClick={auth?.signup}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
