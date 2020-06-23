import React, {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {Button, Modal} from 'antd'

import HomeStore from './store-home'

const store = new HomeStore()

@observer
export default class Home extends Component {
  componentDidMount() {
    // store.getContent()
  }

  render() {
    return (
      <div className="page-home">
        home
      </div>
    )
  }
}
