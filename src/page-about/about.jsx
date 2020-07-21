import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";

import AboutStore from "./store-about";

const store = new AboutStore();

@observer
export default class About extends Component {
  componentDidMount () {
    // store.getContent()
  }

  render () {
    return <div className="page-home">home</div>;
  }
}
