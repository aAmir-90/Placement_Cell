// Login.js
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Paper,
  Button,
  Typography,
} from "@mui/material";

function AuthPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isSignup = localStorage.getItem("authType");
  const navigate = useNavigate();

  const loginUser = () => {
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "content-application": "application/json",
      },
      body: {
        username: username,
        password: password,
      },
    }).then((response) => console.log(response));
  };

  const signupUser = () => {
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "content-application": "application/json",
      },
      body: {
        name: name,
        username: username,
        password: password,
      },
    }).then((response) => console.log(response));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signupUser();
    } else {
      loginUser();
    }
  };

  useEffect(() => {}, [isSignup]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100%",
        background: "#eeeeee",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "500px",
        }}
      >
        <Paper
          elevation={0}
          sx={{ borderRadius: "0px", textAlign: "center", p: 3 }}
        >
          {isSignup === "signup" ? <h2>Sign up</h2> : <h2>Login</h2>}
          {isSignup === "signup" && (
            <Box m={3}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          )}
          <Box m={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box m={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            sx={{ mb: 2 }}
            disableElevation
            variant="contained"
            onClick={handleSubmit}
            size="large"
          >
            {isSignup === "signup" ? "Sign up" : "Login"}
          </Button>
          {isSignup === "signup" ? (
            <Typography variant="subtitle1">
              Already a user ?{" "}
              <NavLink
                onClick={() => localStorage.setItem("authType", "login")}
              >
                Login
              </NavLink>
            </Typography>
          ) : (
            <Typography variant="subtitle1">
              Not a user ?{" "}
              <NavLink
                onClick={() => localStorage.setItem("authType", "signup")}
              >
                Sign Up
              </NavLink>
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default AuthPage;
