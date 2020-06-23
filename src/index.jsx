import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Frame from './frame'

import Home from './page-home'

export default class Entry extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Frame>
            <Switch>
              <Route path="/home" component={Home} />
              <Redirect exact from="/" to="/home" />
            </Switch>
          </Frame>
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(<Entry />, document.getElementById('root'))
