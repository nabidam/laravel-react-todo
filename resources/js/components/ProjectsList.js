import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ListofProjects from './ListofProjects'
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
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
});

class ProjectsList extends Component {
  constructor () {
    super()
    this.state = {
			open: false,
      projects: [],
			name: '',
      description: '',
      errors: [],
      refreshProjectList: false,
      nameError: false,
      descriptionError: false
    }

		this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewProject = this.handleCreateNewProject.bind(this)

  }

	handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


	handleCreateNewProject (event) {
    event.preventDefault()

    const { history } = this.props

    const project = {
      name: this.state.name,
      description: this.state.description
  	}
    let valid = true
    if (project.name.length === 0){
      this.setState({
        nameError: true
      })
      valid = false
    }
    if (project.description.length === 0){
      this.setState({
        descriptionError: true
      })
      valid = false
    }
    if(valid){
      axios.post('/api/projects', project)
        .then(response => {
  				this.setState({
  					open: false,
  					name: '',
  					description: '',
  					error: []
  				})
        this.setState({refreshProjectList: !this.state.refreshProjectList})
          // redirect to the homepage
          history.push('/')
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })
    }

  }

  componentDidMount () {
    this.setState({refreshProjectList: !this.state.refreshProjectList})
  }

	handleCreateProject = () => {
    this.setState(
			{ open: true }
		);
  };

	handleCloseDialog = () => {
    this.setState(
			{ open: false }
		);
  };

  render () {
    const { projects, nameError, descriptionError } = this.state;
		const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center">
            <Grid item xs={6}>
          		<Card justify="center" className={classes.card}>
          		<CardHeader title="Projects"
                action={
									<Tooltip title="Add" aria-label="Add" size="small" onClick={this.handleCreateProject}>
						        <Fab color="primary" className={classes.fab}>
						          <AddIcon />
						        </Fab>
						      </Tooltip>
								 }
								 />
								 <Dialog
									 open={this.state.open}
									 onClose={this.handleCloseDialog}
									 aria-labelledby="form-dialog-title"
								 >
									 <DialogTitle id="form-dialog-title">Create New Project</DialogTitle>
									 <DialogContent>
										 <TextField
											 autoFocus
											 name="name"
											 margin="dense"
											 id="name"
											 label="name"
											 type="text"
                       error ={this.state.name.length !== 0 ? false : nameError}
											 value={this.state.name}
											 onChange={this.handleFieldChange}
          						 variant="outlined"
											 fullWidth
                       required
										 />
										 <TextField
										   name="description"
											 margin="dense"
											 id="description"
											 label="description"
											 type="text"
											 value={this.state.description}
											 onChange={this.handleFieldChange}
          						 variant="outlined"
											 multiline
          	 					 rowsMax="5"
											 fullWidth
                       required
                       error ={this.state.description.length !== 0 ? false : descriptionError }
										 />
									 </DialogContent>
									 <DialogActions>
										 <Button onClick={this.handleCloseDialog} color="primary">
											 Cancel
										 </Button>
										 <Button onClick={this.handleCreateNewProject} color="primary">
											 Create
										 </Button>
									 </DialogActions>
								 </Dialog>
                <Divider />
                  <CardContent>
                    <ListofProjects refresh={this.state.refreshProjectList}/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    );
  }
}


ProjectsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectsList);
