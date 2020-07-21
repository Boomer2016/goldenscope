import React from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import cls from 'classnames'

const menus = [
  {
    menuName: '关于金竟',
    menuKey: 'aboutGE',
    menuPath: './about'
  },
  {
    menuName: '产品中心',
    menuKey: 'productCenter',
    menuPath: './about'
  },
  {
    menuName: '应用领域',
    menuKey: 'appArea',
    menuPath: './about'
  },
  {
    menuName: '客户服务',
    menuKey: 'customerService',
    menuPath: './about'
  },
  {
    menuName: '新闻中心',
    menuKey: 'newsCenter',
    menuPath: './about'
  },
  {
    menuName: '联系我们',
    menuKey: 'contactUs',
    menuPath: './about'
  },
]

@observer
class Header extends React.Component {
  @observable activeKey = 'aboutGE'
  render () {
    const { history } = this.props
    const menuItem = menus.map(item => {
      return (
        <span
          key={item.menuKey}
          className={cls({ "mr40 menu-item": true, active: this.activeKey === item.menuKey })}
          onClick={() => {
            this.activeKey = item.menuKey
            history.push(item.menuPath)
          }}
        >
          {item.menuName}
        </span>
      )
    })
    return (
      <div className="common-header FBH FBJC">
        <div className="header-logo pr40">金竟科技</div>
        <div className="common-menu">
          {menuItem}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
