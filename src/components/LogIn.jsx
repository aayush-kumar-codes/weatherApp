import CloseIcon from "@mui/icons-material/Close";
import { Button, FormControl, Grid, Snackbar, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/weatherApp";
import style from "../styles/Login.module.css";

function LogIn() {
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [alert, setAlert] = useState({ open: false, msg: "" });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.counter.isUserLoggedIn);
  console.log("amiga ===========> ",user)
  const loginHandler = () => {
    if (auth.username === "admin" || auth.username === "user") {
      if (auth.username === auth.password) dispatch(login({ ...auth }));
      setAlert({ open: true, msg: "User Login success" });
      setAuth({ username: "", password: "" });
    } else {
      setAlert({ open: true, msg: "Wrong username or password" });
      setAuth({ username: "", password: "" });
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid
      container
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "2rem",
        }}
        className={style["login__box"]}
        onSubmit={(e) => e.preventDefault()}
      >
        <Grid item>
          <FormControl>
            <TextField
              variant="outlined"
              label="Username"
              size="small"
              style={{ marginBottom: "2em" }}
              value={auth.username}
              onChange={(e) => setAuth({ ...auth, username: e.target.value })}
              autoComplete="false"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              variant="outlined"
              label="Password"
              size="small"
              style={{ marginBottom: "2em" }}
              type="password"
              value={auth.password}
              onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              autoComplete="false"
            />
          </FormControl>
        </Grid>
        <Button
          variant="contained"
          style={{
            width: "100%",
          }}
          type="submit"
          disabled={auth.password?.length <= 0 && auth.username?.length <= 0}
          onClick={loginHandler}
        >
          Login
        </Button>
      </form>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={alert.msg}
        action={action}
      />
    </Grid>
  );
}

export default LogIn;
