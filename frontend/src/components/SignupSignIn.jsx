import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Typography from "@mui/material/Typography";
import { loginApi, signupApi } from "../api/SignupSigninForm";
import { useTaskManagementStore } from "../store/store";
import { showErrorToast, showSuccessToast } from "../errors/ErrorToast";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/sahilanower2/">
        Sahil Anower
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignupSignIn() {
  const setTokens = useTaskManagementStore((state) => state.setTokens);
  const setEmail = useTaskManagementStore((state) => state.setEmail);
  //   const accessToken = useTaskManagementStore((state) => state.accessToken);
  const navigate = useNavigate();

  const [isSignin, setIsSignin] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const [signInFormData, setSignInFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signUpFormData, setSignUpFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleToggleSigninSignup = () => {
    setIsSignin((prevState) => !prevState);
  };

  const handleSignInChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setSignInFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    console.log("Sign In Form Submitted:", signInFormData);
    try {
      const response = await loginApi({
        email: signInFormData.email,
        password: signInFormData.password,
      });
      setTokens(response.accessToken, response.refreshToken);
      setEmail(signInFormData.email);
      showSuccessToast("Sign in successful!");
    } catch (error) {
      // toast message for error
      showErrorToast(error?.response?.data?.message);
    }
    setSignInFormData({
      email: "",
      password: "",
      rememberMe: false,
    });
    navigate("/");
    // api call to signin
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    console.log("Sign Up Form Submitted:", signUpFormData);
    try {
      const response = await signupApi({
        name: signUpFormData.name,
        email: signUpFormData.email,
        password: signUpFormData.password,
      });
      setTokens(response.accessToken, response.refreshToken);
      setEmail(signUpFormData.email);
      showSuccessToast("Sign up successful!");
    } catch (error) {
      // toast message for error
      showErrorToast(error?.response?.data?.message);
    }
    setSignUpFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    // api call to signup
    navigate("/");
  };

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  return (
    // <ThemeProvider>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h6">
            Welcome to Sahil - <strong>Task Manager App</strong> 🤯!
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {isSignin ? <ExitToAppIcon /> : <CelebrationIcon />}
          </Avatar>
          <Typography component="h3" variant="h6">
            {isSignin ? "Sign in" : "Sign up"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={isSignin ? handleSignInSubmit : handleSignUpSubmit}
            sx={{ mt: 0.5 }}
          >
            {!isSignin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={signUpFormData.name}
                onChange={handleSignUpChange}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={!isSignin ? signUpFormData.email : signInFormData.email}
              onChange={!isSignin ? handleSignUpChange : handleSignInChange}
              error={
                !isEmailValid(
                  !isSignin ? signUpFormData.email : signInFormData.email
                )
              }
              helperText={
                !isEmailValid(
                  !isSignin ? signUpFormData.email : signInFormData.email
                )
                  ? "Invalid email address"
                  : ""
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={
                !isSignin ? signUpFormData.password : signInFormData.password
              }
              onChange={!isSignin ? handleSignUpChange : handleSignInChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {!isSignin && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="signup-confirm-password"
                autoComplete="new-password"
                value={signUpFormData.confirmPassword}
                onChange={handleSignUpChange}
                error={
                  signUpFormData.password !== signUpFormData.confirmPassword
                }
                helperText={
                  signUpFormData.password !== signUpFormData.confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
              />
            )}
            {isSignin && (
              <FormControlLabel
                control={
                  <Checkbox
                    value={signInFormData.rememberMe}
                    color="primary"
                    onChange={handleSignInChange}
                    name="rememberMe"
                  />
                }
                label="Remember me"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                isSignin
                  ? !signInFormData.email || !signInFormData.password
                  : !signUpFormData.name ||
                    !signUpFormData.email ||
                    !signUpFormData.password ||
                    !signUpFormData.confirmPassword ||
                    signUpFormData.confirmPassword !== signUpFormData.password
              }
            >
              {isSignin ? "Sign In" : "Sign Up"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleToggleSigninSignup()}
            >
              {isSignin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign in"}
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignupSignIn;
