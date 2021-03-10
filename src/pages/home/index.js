import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {nanoid} from 'nanoid'
import './index.css'

@inject('store') @observer
class Home extends Component {

  handleClick = (type) => {
    const { store } = this.props;
    switch (type) {
      case 'add':
        store.addTodo(
          {
            id: nanoid(), 
            name: `任务${store.todos.length + 1}`
          }
        )
        break;

      case 'delete':
        store.deleteTodo()
        break;

      case 'reset':
        store.resetTodo()
        break;

      default:
        break;
    }
    
  }

  render() {
    const { store } = this.props;
    return (
      <div className="home">
        <h1>在react中使用mobx</h1>
        <h4>当前时间：{store.time}，还有{store.todos.length}个任务待完成</h4>
        <button onClick={() => this.handleClick('add')}>添加一个任务</button>
        <button onClick={() => this.handleClick('delete')}>删除一个任务</button>
        <button onClick={() => this.handleClick('reset')}>重置任务</button>
        <ul>
          {
            store.todos.map(todo => {
              return (
                <li key={todo.id}>{todo.name}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Home
