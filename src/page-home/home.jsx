// import React, { Component } from "react";
// import { observable, action } from "mobx";
// import { observer } from "mobx-react";
// import { Button, Modal } from "antd";

// import HomeStore from "./store-home";

// const store = new HomeStore();

// @observer
// export default class Home extends Component {
//   componentDidMount() {
//     // store.getContent()
//   }

//   render() {
//     return <div className="page-home">home</div>;
//   }
// }

import React, { useState, useEffect } from 'react'

// api1: useState []的作用采用解构赋值， 第一个值我当前的state，第二个值为更新state的参数，useState的参数为state的初始值
// function Home () {
//   const [count, setCount] = useState(0)
//   return (
//     <div>
//       <p>点击了{count}次</p>
//       <button onClick={() => setCount(count + 1)}>点击</button>
//     </div>
//   )
// }

// api2：useEffect 在函数组件中执行副作用（钩子函数）的操作，useEffect(() =>{},[]),接收两个参数，第一个函数，第二个为数组
function Home () {
  const [count, setCount] = useState(0)
  const btnClick = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    console.log('执行了useEffect');
    document.title = `点击了${count}次`
  })
  return (
    <div>
      <p>点击{count}次</p>
      <button onClick={() => { btnClick() }}>点击</button>
    </div>
  )
}

export default Home
