import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import MyTextField from "../UI/Input";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const useStyles = makeStyles(() => ({
  root: {
    marginTop: "2rem",
  },
  button: {
    backgroundColor: "#8C7272",
    color: "white",
  },
}));

export const AddUser = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState(null);

//    useEffect(() => {
//      if (user && user.user.rank === 0) {
//        console.log("object")
//       dispatch(setIsAdmin({isAdmin: true}))
//       history.push("/");
//     } 
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

  return (
    <>
      <Grid container justify="center" style={{ marginTop: "3em" }}>
        <Grid item xs={10} sm={8} lg={6} xl={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography align="center" variant="h3">
                Add User
              </Typography>
              <Formik
                initialValues={{
                  email: "",
                  username: "",
                  password: "",
                }}
                // validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                //   try {
                //     const res = await axios.post("/api/login/", values);
                //     const { token } = res.data;
                //     console.log(token)
                //     dispatch(setUser({ user: token}));
                //     history.push("/");
                    
                //   } catch (e) {
                //     console.log(e)
                //     setErrors(e.response.data.errors[0].msg);
                //     actions.resetForm();
                //   }
                console.log(values)
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
                      name="username"
                      type="text"
                      label={"Username"}
                    />
                    <br />
                    <MyTextField
                     style={{width: "100%"}}
                      name="password"
                      type="password"
                      label={"Password "} 
                    />
                    <br />
                    <Link
                        style={{ textDecoration: "none", color: "currentColor" }}
                        to={"./RecordNewUser"}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Next step
                    </Button>
                    </Link>
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

export default AddUser;

