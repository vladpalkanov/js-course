import React from 'react';
import propTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';

const compose = (...fns) => {
  return value => {
    let result = value;

    for (let fn of fns) {
      result = fn(result)
    }

    return result;
  }
}

const withValidation = (validationFn, errorMessage) => BaseComponent => {
  return class WithValidation extends React.Component {
    render() {
      if (this.props.error) {
        return <BaseComponent {...this.props} />
      }

      const isError = validationFn(this.props.value)

      return (
        <BaseComponent
          {...this.props}
          error={isError ? errorMessage : null}
        />
      )
    }
  }  
}

const TextField = props => {
  const isError = props.error && props.dirty
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      {props.label && (
        <label htmlFor="text-field">{props.label}</label>
      )}
      <input
        id="text-field"
        style={{
          border: `1px solid ${isError ? 'red' : 'black'}`
        }}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {isError && (
        <div style={{ color: 'red' }}>{props.error}</div>
      )}
    </div>
  )
}

const emailValidationFn = value => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return value ? !re.test(String(value).toLowerCase()) : false
}

const requiredValidationFn = value => !value

const withEmailValidation = withValidation(emailValidationFn, 'Invalid Email')
const withRequiredValidation = withValidation(requiredValidationFn, 'Required')

function debounce(f, ms) {
  let isCooldown = false

  return function() {
    if (isCooldown) return;
    f.apply(this, arguments)
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  }
}

const withDebounce = timeout => BaseComponent => {
  return class WithDebounce extends React.Component {
    state = {
      onChange: null,
    }

    static getDerivedStateFromProps(nextProps, state) {
      if (nextProps.onChange !== state.onChange) {
        const debouncedOnChange = debounce(nextProps.onChange, timeout)

        return {
          debouncedOnChange,
          onChange: nextProps.onChange
        }
      }

      return null
    }

    handleChange = event => {
      return debounce(this.props.onChange, timeout)
    }

    render() {
      return <BaseComponent
        {...this.props}
        onChange={this.state.debouncedOnChange}
      />
    }
  }
}

const withDirty = BaseComponent => {
  return class WithDirty extends React.Component {
    state = {
      dirty: false,
    }

    handleBlur = event => {
      console.log(event)
      this.setState({ dirty: true });
      return this.props.onBlur && this.props.onBlur(event);
    }

    handleChange = event => {
      this.setState({ dirty: true });
      return this.props.onChange && this.props.onChange(event);
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          dirty={this.state.dirty}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      )
    }
  }
}


const withTextFieldValidation = compose(
  withEmailValidation,
  withRequiredValidation,
)

const withField = compose(
  withDirty,
  withTextFieldValidation,
)

const EnhancedTextField = withField(TextField)


class App extends React.Component {
  state = {
    value: '',
    error: null,
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    return (
      <EnhancedTextField
        label="Email"
        value={this.state.value}
        error={this.state.error}
        onChange={this.handleChange}
      />
    )
  }
}

export default App;
