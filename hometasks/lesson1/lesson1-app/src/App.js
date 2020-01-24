// type-check
import React from 'react'

const names = [
  'Vlad',
  'Alex',
  'Max',
  'Ihor',
  'Bob',
  'John',
  'Vladimir',
  'Vladlen',
]

const Users = Array.from({ length: 10 }).map(() => ({
  name: names[Math.floor(Math.random() * 7)],
  age: Math.floor(Math.random() * 100),
}))

const loadUser = ({ search }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if (Math.random() >= 0.6) {
      //   reject('Oops... Something gone wrong!');
      // }
      let response = Users
      if (search) {
        response = response.filter(item => item.name.includes(search))
      }

      resolve(response)

    }, 1500)
  })
}

export class UserList extends React.PureComponent {
  state = {
    loading: false,
    error: null,
    items: [],
    selectedId: null,
  }

  load = async () => {
    this.setState({
      loading: true,
    })

    try {
      const users = await loadUser({ search: this.state.search })
      console.log(users)
      this.setState({ items: users })
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    this.load()
  }

  componentDidUpdate(_, prevState) {
    if (this.state.search !== prevState.search) {
      this.load()
    }
  }



  handleSearch = event => {
    this.setState({
      search: event.target.value,
    })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    
    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    return (
      <div>
        <input onChange={this.handleSearch} value={this.state.search} />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item => {
              return (
                <tr>
                  <th>{item.name}</th>
                  <th>{item.age}</th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  // static getDerivedStateFromProps() {
  //   console.log('getDerivedStateFromProps')
  // }

  // static getSnapshotBeforeUpdate(props) {
  // }

  handleClick = () => {
    this.setState(currentState => {
      return {
        value: currentState.value + 1,
      }
    })
  }


  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <UserList />
      </div>
    )
  }

}