import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  footer: {
     color: "#504c4c"
  },
  icon: {
    color: 'red'
  },
  name: {
    color: '#000',
    fontSize: '1.em'
  }
});

class Footer extends Component {


  render () {
    const { classes } = this.props
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center">
            <Grid item xs={6}>
              <Grid container justify="center">
                  <Typography variant="caption" gutterBottom className={classes.footer}>
                    Made with <span className={classes.icon}><i className="fas fa-heart" title="love"></i></span> by <span className="">navid</span>.
                  </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}


Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
