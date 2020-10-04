import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import IconButton from "@material-ui/core/IconButton";
import yellow from '@material-ui/core/colors/yellow';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    backgroundColor: "#D7D6C0",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-evenly",
    
  },
  link: {
    textDecoration: "none"
  }
});



export default function NavBar() {

  const classes = useStyles()  
  const items = [
    {
      path: "/",
      title: "home",
      icon: <HomeIcon />,
    },
    {
      path: "/patients",
      title: "patients",
      icon: <PersonIcon />,
    },
    {
      path: "/hospitals",
      title: "Hospitals",
      icon: <LocalHospitalIcon />,
    },
    {
      path: "/covid-tests",
      title: "Covid Tests",
      icon: <CheckCircleOutlineIcon />,
    },
    {
      path: "/cities",
      title: "Cities",
      icon: <LocationCityIcon />,
    },
  ];
  return (
    <AppBar position="fixed" className={classes.root} >
      <Toolbar>
        <Grid container className={classes.navBar} sm={12}>
          {items.map((item, i) => {
            return (
              <Link className={classes.link} to={item.path}>
                <Grid item >
                  <IconButton aria-label={item.title}>
                    {item.icon}
                    <Typography className={classes.typo} variant="h6">
                      {item.title}
                    </Typography>
                  </IconButton>
                </Grid>
              </Link>
            );
          })}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
