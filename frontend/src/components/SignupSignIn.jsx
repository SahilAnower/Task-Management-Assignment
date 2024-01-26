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
  const [isSignin, setIsSignin] = React.useState(false);

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

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    console.log("Sign In Form Submitted:", signInFormData);
    // api call to signin
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    console.log("Sign Up Form Submitted:", signUpFormData);
    // api call to signup
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
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {isSignin ? <ExitToAppIcon /> : <CelebrationIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={
                !isSignin ? signUpFormData.password : signInFormData.password
              }
              onChange={!isSignin ? handleSignUpChange : handleSignInChange}
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
