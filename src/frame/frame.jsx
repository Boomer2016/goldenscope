import React from 'react'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
// 公用的样式模块
import 'antd/dist/antd.less'
import '../common/util.styl'
import '../common/flex-box.styl'

export default class Frame extends React.Component {
  render() {
    const {children} = this.props

    return (
      <ConfigProvider locale={zhCN}>
        <div className="FBH">
          <div className="FB1">{children}</div>
        </div>
      </ConfigProvider>
    )
  }
}
