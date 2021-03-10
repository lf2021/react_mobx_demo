# 在react项目中使用mobx

## 安装必备的库

安装 mobx 和 mobx-react

```cmd
npm i mobx mobx-react -S
```

安装两个 babel 插件以支持装饰器语法

```cmd
npm i @babel/plugin-proposal-decorators -S
npm i @babel/plugin-proposal-class-properties -S
```

光安装这两个插件还不足以支持，还需要进行配置。如果你是用的 create-react-app 脚手架创建的项目，那首先运行 `npm run eject` 把隐藏的配置文件暴露出来，然后在 `package.json` 中找到 "babel"，加上相应的配置项

```js
"babel": {
+   "plugins": [
+     [
+       "@babel/plugin-proposal-decorators",
+       {
+         "legacy": true
+       }
+     ],
+     [
+       "@babel/plugin-proposal-class-properties",
+       {
+         "loose": true
+       }
+     ]
+   ],
    "presets": [
      "react-app"
    ]
  },
```

再对 ESLint 进行配置

```js
"eslintConfig": {
+ "parserOptions": {
+   "ecmaFeatures": {
+     "legacyDecroators": true
+   }
+ },
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
```

## 运行项目

```cmd
// 初始化依赖
npm install

// 运行
npm start
```

## 坑

2021.3.10，此刻 mobx 的版本已经是6.x版本，与5.x/4.x版本有所不同

```js
// 4.x/5.x版本
import { observable, action, computed } from 'mobx'
class AppStore {
  @observable time = '2021-03-10'
  @observable todos = []

  // 类似vue计算属性
  @computed get desc() {
    return `当前时间：${this.time}，还有${this.todos.length}个任务待完成`
  }
  
  @action addTodo() {
    this.todos.push('一个新任务')
  }
}

// 6.x版本
import { makeAutoObservable } from 'mobx'

class AppStore {
  constructor() {
    makeAutoObservable(this)
  }

  time = '2021-03-10'
  todos = [{id: '0001', name: '任务1'}]

  get desc() {
    return `当前时间：${this.time}，还有${this.todos.length}个任务待完成`
  }

  addTodo = todo => {
    this.todos.push(todo)
  }
}
```
