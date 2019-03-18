import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if(nextProps.content !== this.props.content){
      return true;
    }else{
      return false;
    }
  }

  render() {
    const { content } = this.props;
    return ( 
      <li 
        onClick={this.handleClick} 
      >{content}</li>
    )
  }

  handleClick () {
    const { handleItemDelete, index } = this.props;
    handleItemDelete(index);
  }
}

TodoItem.propTypes = {
  content: PropTypes.string,
  handleItemDelete: PropTypes.func,
  index: PropTypes.number
}

export default TodoItem
