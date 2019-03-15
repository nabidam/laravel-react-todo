import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewProject from './NewProject'
import ProjectsList from './ProjectsList'
import SingleProject from './SingleProject'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from './Footer'
const theme = createMuiTheme({
  typography: {
  	fontFamily: [
  		"Roboto",
  		"-apple-system",
  		"BlinkMacSystemFont",
  		"Segoe UI",
  		"Arial",
  		"sans-serif"
  	].join(","),
  	useNextVariants: true
  },
  palette: {
    primary: {
      main: '#009688'
    },
    secondary: {
      main: '#d50000',
    },
  },
});

class App extends Component {

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={ProjectsList} />
              <Route path='/create' component={NewProject} />
              <Route path='/:id' component={SingleProject} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
