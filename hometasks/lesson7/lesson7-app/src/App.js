import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, NavLink, withRouter } from 'react-router-dom';
import { Users } from './pages/Users'

const Routing = () => {
  return (
    <Switch>
      <Route path="/users" component={Users} />
      {/* <Route path="/tasks" component={UserListPage} />
      <Route path="/projects" component={UserListPage} /> */}
      <Route render={() => 404} />
    </Switch>
  )
}

const Navigation = withRouter(props => {
  console.log(props)
  return (
    <aside style={{display: 'flex', flexDirection: 'column' }}>
      <NavLink to="/users" activeStyle={{ color: 'orange' }}>User List</NavLink>
      <NavLink to="/posts" activeStyle={{ color: 'orange' }}>Posts</NavLink>
      <a href="#" onClick={event => {
        event.preventDefault();
        props.history.goBack()
      }}>Go Back</a>
    </aside>
  )
})

function App() {
  return (
    <BrowserRouter>
      <header>
        My app
      </header>
      <Navigation />
      <section>
        <Routing />
      </section>
      <footer>
        footer
      </footer>
    </BrowserRouter>
  );
}

export default App;
