import React from 'react'

export class UserEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name,
      age: props.age,
      city: props.city,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      age: nextProps.age,
      city: nextProps.city,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.onSubmit(this.state)
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleAgeChange = event => {
    this.setState({ age: event.target.value })
  }

  handleCityChange = event => {
    this.setState({ city: event.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            value={this.state.name}
            id="name"
            onChange={this.handleNameChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="age">Age</label>
          <input
            value={this.state.age}
            id="age"
            onChange={this.handleAgeChange}
          />
        </fieldset>
        <fieldset>
        <label htmlFor="city">City</label>
          <input
            value={this.state.city}
            id="city"
            onChange={this.handleCityChange}
          />
        </fieldset>
        <button type="submit">Save</button>
      </form>
    )
  }
}