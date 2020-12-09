import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import MyTextField from "../UI/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsAdmin, setUser } from "../../redux/reducers/UserReducer";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .required("password is required"),
});

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "2rem",
  },
  button: {
    backgroundColor: "#8C7272",
    color: "white",
  },
}));

const Login = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState(null);


  // useEffect(() => {
  //   if (user && (user.user.rank === 1 || user.user.rank === 0)) {
  //     history.push("/TrainerHomePage");
  //   } else if (user && user.user.rank === 2) history.push("/");
  // }, [user, history]);

   useEffect(() => {
     if (user && user.user.rank === 0) {
       console.log("object")
      dispatch(setIsAdmin({isAdmin: true}))
      history.push("/");
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Grid container justify="center" style={{ marginTop: "3em" }}>
        <Grid item xs={10} sm={8} lg={6} xl={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography align="center" variant="h3">
                Login
              </Typography>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const res = await axios.post("/api/login/", values);
                    const { token } = res.data;
                    console.log(token)
                    dispatch(setUser({ user: token}));
                    history.push("/");
                    
                  } catch (e) {
                    console.log(e)
                    setErrors(e.response.data.errors[0].msg);
                    actions.resetForm();
                  }
                }}
              >
                {(values, isSubmitting) => (
                  <Form align="center">
                    <MyTextField
                    style={{width: "100%"}}
                      name="email"
                      type="email"
                      label={"Email"}
                    />
                    <br />
                    <MyTextField
                     style={{width: "100%"}}
                      name="password"
                      type="password"
                      label={"Password "} 
                    />
                    <br />
                    <Button
                      className={classes.button}
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
              <Typography variant="h6" color="error">
                {errors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
