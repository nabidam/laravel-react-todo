import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ListofTasks from './ListofTasks'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    marginTop: 25,
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    flexGrow: 1,
  },
  badge: {
    float: 'right',
  },
	fab: {
    margin: theme.spacing.unit * 2,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  ib: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
  },
});


class SingleProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: {},
      tasks: [],
      title: '',
      errors: []
    }
    this.handleMarkTaskAsCompleted = this.handleMarkTaskAsCompleted.bind(this)
    this.handleMarkProjectAsCompleted = this.handleMarkProjectAsCompleted.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleAddNewTask = this.handleAddNewTask.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }



  handleMarkProjectAsCompleted () {
    const { history } = this.props

    axios.put(`/api/projects/${this.state.project.id}`)
      .then(response => history.push('/'))
  }

  handleMarkTaskAsCompleted (taskId) {
    axios.put(`/api/tasks/${taskId}`).then(response => {
      this.setState(prevState => ({
        tasks: prevState.tasks.filter(task => {
          return task.id !== taskId
        })
      }))

      // this.props.remove(taskId)
    })
  }


  handleFieldChange (event) {
    this.setState({
      title: event.target.value
    })
  }

  handleAddNewTask (event) {
    // event.preventDefault()
    const task = {
      title: this.state.title,
      project_id: this.state.project.id
    }

    if(task.title.length !== 0){
      axios.post('/api/tasks', task)
        .then(response => {
          // clear form input
          this.setState({
            title: ''
          })
          // add new task to list of tasks
          this.setState(prevState => ({
            tasks: prevState.tasks.concat(response.data)
          }))
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })
    }


  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleAddNewTask()
      // write your functionality here
    }
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  componentDidMount () {
    const projectId = this.props.match.params.id

    axios.get(`/api/projects/${projectId}`).then(response => {
      this.setState({
        project: response.data,
        tasks: response.data.tasks
      })

    })

  }

  render () {
    const { project, tasks } = this.state
		const { classes } = this.props

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center">
            <Grid item xs={6}>
          		<Card justify="center" className={classes.card}>
          		<CardHeader title={project.name}
                action={
									<Tooltip title="Add" aria-label="Add" size="small" onClick={this.handleMarkProjectAsCompleted}>
						        <Fab color="primary" className={classes.fab}>
						          <DoneIcon />
						        </Fab>
						      </Tooltip>
								 }
								 />
                <Divider />
                <CardContent>
                  <Paper className={classes.ib} elevation={1}>
                    <InputBase className={classes.input} placeholder="Task Title" name="title" id="title" value={this.state.title} onChange={this.handleFieldChange} onKeyPress={this.handleKeyPress}/>
                    <Divider className={classes.divider} />
                    <IconButton color="primary" className={classes.iconButton} aria-label="Add" onClick={this.handleAddNewTask}>
                      <AddIcon />
                    </IconButton>
                  </Paper>
                </CardContent>
                <CardContent>
                  <ListofTasks tasks={tasks} handler={this.handleMarkTaskAsCompleted}/>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

SingleProject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleProject);
