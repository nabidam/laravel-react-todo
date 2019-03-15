import axios from 'axios';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
	fab: {
    margin: theme.spacing.unit * 2,
  },
  tiny: {
    width: 25,
    height: 25,
    minHeight: '0!important'
  }
});

class ListofTasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: props.tasks
    }
    this.handleMarkTaskAsCompleted = this.props.handler.bind(this)
    // console.log(this.props);
  }
  componentWillReceiveProps(props) {
    const { tasks } = props;
    this.setState({
      tasks: props.tasks
    })
  }

  render () {
    const { classes } = this.props
    const { tasks } = this.state
    return (
      <List component="nav">
        {tasks.map(task => (
          <ListItem key={task.id} >
            {task.title}
            <ListItemSecondaryAction>
              <Tooltip title="Mark as completed" aria-label="x" size="small" onClick={this.handleMarkTaskAsCompleted.bind(this, task.id)}>
                <Fab color="secondary" className={classes.fab, classes.tiny}>
                  <DoneIcon fontSize="small"/>
                </Fab>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  }
}

ListofTasks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListofTasks);
