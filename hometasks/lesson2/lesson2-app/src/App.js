import React from 'react';
import './App.css';
import { UserList } from './components/UserList';

const users = [
  {
    name: 'Name1',
    age: Math.round(Math.random() * 100),
    sex: 'male',
    city: 'Minsk',
    jobTitle: 'Javascript Developer',
  },
  {
    name: 'Name2',
    age: Math.round(Math.random() * 100),
    sex: 'female',
    city: 'Minsk',
    jobTitle: 'Geologist',
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
