import React, {Component, Fragment} from 'react'
import './Todolist.css'
import TodoItem from './TodoItem'
import store from '../store'

class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }
  render() {
    return (
      <Fragment>
        {/** 这是一段注释 */}
        <div>
          <input type='text'
            className='input-item'
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
        <input type='button' value='提交' onClick={this.handleBtnClick}/></div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <TodoItem key={index} content={item} index={index} handleItemDelete={this.handleItemDelete}></TodoItem>
              )
            })
          }
        </ul>
      </Fragment>
    )
  }

  handleInputChange (e) {
    const value = e.target.value
    this.setState(() => ({
      inputVal: value
    }))
  }
  handleBtnClick () {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputVal],
      inputVal: ''
    }))
  }
  handleItemDelete (index) {
    this.setState((prevState) => {
      let list = [...this.state.list]
      list.splice(index, 1)
      return {
        list: list
      }
    })
  }
}
export default TodoList