import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login, setRole } from "../config/auth/authSlice";

const SignInpages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://rsudsamrat.site:8080/employee/login", {
        username: userName,
        password: password,
      })
      .then((res) => {
        const { username, id } = res.data;
        dispatch(login({ username, id }));
        axios
          .get(`http://rsudsamrat.site:8080/employee/${id}`)
          .then((response) => {
            const { role } = response.data;
            console.log(role);
          })
          .catch((err) => console.log(err));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              value={userName}
              onChange={handleChangeUsername}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleChangePassword}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInpages;

// import React, { useRef, useState } from "react";
// // import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import Dashboard from "../pages/Dashboard";

// const SignInpages = () => {
//   const usernameRef = useRef("");
//   const passwordRef = useRef("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSignIn = (e) => {
//     e.preventDefault();

//     if (usernameRef.current.value && passwordRef.current.value) {
//       setErrorMessage("");
//       // Redirect to the dashboard page
//       window.location.href = "/";
//     } else {
//       setErrorMessage("Tolong Masukkan Username dan Password");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="form-container">
//         <h1 className="text-center mb-4">SILAHKAN MASUK</h1>
//         {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
//         <form>
//           <div className="mb-3">
//             <label className="form-label">User ID</label>
//             <input
//               className="form-control"
//               name="Username"
//               ref={usernameRef}
//               type="text"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               className="form-control"
//               name="Password"
//               ref={passwordRef}
//               type="password"
//               required
//             />
//           </div>
//           <button className="btn btn-primary" onClick={handleSignIn}>
//             Log In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInpages;
