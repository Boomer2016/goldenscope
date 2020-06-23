/* eslint react/destructuring-assignment: off */

import React from 'react'

export function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null
    state = {Component: AsyncComponent.Component}

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({Component})
        })
      }
    }

    render() {
      const {Component} = this.state

      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

// 获取URL参数
export function getUrlParam(name, type) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const r = window.location.search.substr(1).match(reg)
  const h = window.location.hash.substr(1).match(reg)
  if (type === 'hash') {
    if (h !== null) {
      return decodeURIComponent(h[2])
    }
  } else if (r !== null) {
    return decodeURIComponent(r[2])
  }
  return null
}

export function noop() {}
