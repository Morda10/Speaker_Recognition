import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/reducers/UserReducer";




export const Header = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
      <div >
       {/* <Grid display="flex" justifyContent="center"> */}
       <Grid container display="flex" align="center">

        <Grid item xs={12}>
            <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to={"/"}
            >
            <Button 
            style={{margin: "1rem"}}
            variant="outlined"
            // fullWidth
        color="primary">Record Wav</Button>
            </Link>

        <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to={"/AddUser"}
            >
            <Button 
            style={{margin: "1rem", width: "8rem"}}
            variant="outlined"
            color="primary"
             >Add user</Button>
        </Link>

            {user ? <Button style={{margin: "1rem"}}  variant="outlined"
            color="primary"   onClick={() => {
                dispatch(logout());
                window.location.href = "/";
            }}>Logout</Button>: <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to={"/Login"}
            >
            
            <Button 
            style={{margin: "1rem", width: "8rem"}} variant="outlined" 
            color="primary">Login</Button>
            </Link>}
        </Grid>
      
       </Grid>
       
      </div>
    )
}
  