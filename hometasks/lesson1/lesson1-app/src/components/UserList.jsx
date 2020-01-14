import React from 'react'
import { User } from './User'

export class UserList extends React.Component {
  render() {
    const items = this.props.items;

    return (
      <div>
        {items.map(item => <User {...item} />)}
      </div>
    );
  }
}