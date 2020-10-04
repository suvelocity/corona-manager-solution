
import React from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "./components/AppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    backgroundColor: "green",
  },
});

function App() {
  const classes = useStyles()
  return (
    <div>
      <Router>
        <Grid className={classes.root} container>
          <Grid xs={12}>
            <NavBar />
          </Grid>
          <Switch>
            <Route exact path="\" cpmponent={HomePage}/>
            <Route exact path="\hospitals" />
            <Route exact path="\patients" />
            <Route exact path="\covid-tests" />
            <Route exact path="\cities" />
          </Switch>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
