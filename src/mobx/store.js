import { makeAutoObservable } from 'mobx'
import moment from 'moment'

class AppStore {
  constructor() {
    makeAutoObservable(this)
  }

  // state
  time = '2021-03-10'
  todos = [{id: '0001', name: '任务1'}]

  get desc() {
    return `当前时间：${this.time}，还有${this.todos.length}个任务待完成`
  }

  // action
  addTodo = todo => {
    this.todos.push(todo)
  }

  deleteTodo = () => {
    this.todos.pop()
  }

  resetTodo = () => {
    this.todos = []
  }

  updateTime = () => {
    this.time = moment().format('YYYY-MM-DD HH:mm:ss')
  }
}

const store = new AppStore()

setInterval(() => {
  store.updateTime()
}, 1000)

export default store;
