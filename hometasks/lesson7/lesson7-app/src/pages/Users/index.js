import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';

import { UserAddPage } from './UserAddPage';
import { UserEditPage } from './UserEditPage';
import { UserListPage } from './UserListPage';
import { UserDetailPage } from './UserDetailPage';

export const Users = props => {
  return (
    <div>
      <h1>Users</h1>
      <Switch>
        <Route exact path="/" component={UserListPage} />
        <Route path="/users/:id/edit" component={UserEditPage} />
        <Route path="/users/new" component={UserAddPage} />
        <Route path="/users/:id" component={UserDetailPage} />
      </Switch>
    </div>
  )
}