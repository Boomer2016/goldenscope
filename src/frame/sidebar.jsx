import React from 'react'
import {withRouter} from 'react-router-dom'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import {Avatar} from 'antd'
import cls from 'classnames'

import timeSvg from '../image/time.svg'
import cameraSvg from '../image/camera.svg'
import actionSvg from '../image/action.svg'

const menus = [
  {
    name: '时光机',
    key: 'time',
    icon: timeSvg,
    color: '#AF5F5B',
    submenus: [
      {
        name: '最近',
        key: 'latest',
        path: '/hello',
      },
      {
        name: '感想',
        key: 'thoughts',
        path: '/hello',
      },
      {
        name: '记忆碎片',
        key: 'memories',
        path: '/hello',
      },
    ],
  },
  {
    name: '器物',
    icon: cameraSvg,
    color: '#31927B',
    key: 'implements',
    submenus: [
      {
        name: '好吃的',
        key: 'delicious',
      },
      {
        name: '去过的地方',
        key: 'places',
      },
      {
        name: '想要的',
        key: 'wants',
      },
    ],
  },
  {
    name: '留下的',
    key: 'left',
    color: '#35708A',
    icon: actionSvg,
    submenus: [
      {
        name: '图&像',
        key: 'image',
      },
      {
        name: '空',
        key: 'empty',
      },
      {
        name: '杂',
        key: 'any',
      },
    ],
  },
]
@observer
class Sidebar extends React.Component {
  @observable activeKey = 'latest'
  render() {
    const {history} = this.props
    const menuItem = menus.map(item => {
      const subMenuItem = item.submenus.map(k => (
        <div
          key={k.key}
          className="pl30 mt8 hand menu-hover fw300"
          onClick={() => {
            this.activeKey = k.key
            history.push(k.path)
          }}
        >
          <span className={cls({active: this.activeKey === k.key})}>{k.name}</span>
        </div>
      ))
      return (
        <div key={item.key} className="mt8 hand">
          <span className="menu-hover">
            <img alt="" src={item.icon} className="menu-icon" />
            <span className="fw500" style={{color: item.color}}>
              {item.name}
            </span>
          </span>
          {subMenuItem}
        </div>
      )
    })
    return (
      <div className="side-bar FBV">
        <div className="user-area pt20 FBV">
          <Avatar src="https://img3.doubanio.com/view/photo/l/public/p2564328443.webp" style={{width: 100, height: 100, marginLeft: 20}} />
          <span className="mt20">匿屿-匿屿</span>
          <span className="user-info-desc">这家伙很懒，什么也没有留下。</span>
        </div>
        <div className="menu-area">{menuItem}</div>
      </div>
    )
  }
}

export default withRouter(Sidebar)
