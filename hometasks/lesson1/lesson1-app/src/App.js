import React from 'react';
import './App.css';
import { UserList } from './components/UserList';

const users = [
  {
    name: 'Name1',
    age: Math.round(Math.random() * 100),
    sex: 'male',
  },
  {
    name: 'Name2',
    age: Math.round(Math.random() * 100),
    sex: 'female',
  }
]

function App() {
  return (
    <div>
      <UserList items={users} />
    </div>
  );
}

export default App;
