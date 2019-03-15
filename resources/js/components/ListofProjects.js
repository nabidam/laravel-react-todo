import axios from 'axios'
import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom'

class ListofProjects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shouldUpdate: false,
      projects: []
    }
  }

  componentDidMount () {
    axios.get('/api/projects').then(response => {
      this.setState({
        projects: response.data
      })
    })
  }

  componentWillReceiveProps(props) {
    const { refresh } = this.props;
    if (props.refresh != refresh) {
      axios.get('/api/projects').then(response => {
        this.setState({
          projects: response.data
        })
      })
    }
  }

  render () {
    const { projects } = this.state
    return (
      <List component="nav">
        {projects.map(project => (
          <ListItem button component={Link} to={`/${project.id}`} key={project.id} >
            {project.name}
            <ListItemSecondaryAction>
              <Chip label={project.tasks_count} color="primary" variant="outlined" />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  }
}

export default ListofProjects
