import React from 'react'
import { User } from './User'
import { UserEdit } from './UserEdit'

export class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: props.items,
    }
  } 

  handleUserClick = (user) => {
    this.setState({
      selected: user,
    });
  }

  handleUserEdit = nextUser => {
    const nextUserIndex = this.state.items
      .findIndex(item => item.name === nextUser.name)
    const nextItems = [
      ...this.state.items.slice(0, nextUserIndex),
      nextUser,
      ...this.state.items.slice(nextUserIndex + 1),
    ]

    this.setState(
      { items: nextItems, selected: null }
    )
  }

  render() {
    const items = this.state.items;

    return (
      <div className="users-screen">
        <div className="user-list">
          {items.map(item => (
            <div onClick={() => this.handleUserClick(item)}>
              <User {...item} /> 
            </div>
          ))}
        </div>
        {
          this.state.selected && (
            <UserEdit
              onSubmit={this.handleUserEdit}
              {...this.state.selected}
            />
          )
        }
      </div>
    );
  }
}