import React from 'react';
import { LoginForm } from './components/LoginForm'
import './App.css';

// const compose = (...fns) => {
//   return value => {
//     let result = value;

//     for (let fn of fns) {
//       result = fn(result)
//     }

//     return result;
//   }
// }

// const withValidation = (validationFn, errorMessage) => BaseComponent => {
//   return class WithValidation extends React.Component {
//     render() {
//       if (this.props.error) {
//         return <BaseComponent {...this.props} />
//       }

//       const isError = validationFn(this.props.value)

//       return (
//         <BaseComponent
//           {...this.props}
//           error={isError ? errorMessage : null}
//         />
//       )
//     }
//   }  
// }



// const emailValidationFn = value => {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return value ? !re.test(String(value).toLowerCase()) : false
// }

// const requiredValidationFn = value => !value

// const withEmailValidation = withValidation(emailValidationFn, 'Invalid Email')
// const withRequiredValidation = withValidation(requiredValidationFn, 'Required')

// function debounce(f, ms) {
//   let isCooldown = false

//   return function() {
//     if (isCooldown) return;
//     f.apply(this, arguments)
//     isCooldown = true;
//     setTimeout(() => isCooldown = false, ms);
//   }
// }

// const withDebounce = timeout => BaseComponent => {
//   return class WithDebounce extends React.Component {
//     state = {
//       onChange: null,
//     }

//     static getDerivedStateFromProps(nextProps, state) {
//       if (nextProps.onChange !== state.onChange) {
//         const debouncedOnChange = debounce(nextProps.onChange, timeout)

//         return {
//           debouncedOnChange,
//           onChange: nextProps.onChange
//         }
//       }

//       return null
//     }

//     handleChange = event => {
//       return debounce(this.props.onChange, timeout)
//     }

//     render() {
//       return <BaseComponent
//         {...this.props}
//         onChange={this.state.debouncedOnChange}
//       />
//     }
//   }
// }




// const withTextFieldValidation = compose(
//   withEmailValidation,
//   withRequiredValidation,
// )

// const withField = compose(
//   withDirty,
//   withTextFieldValidation,
// )

// const EnhancedTextField = withField(TextField)

class App extends React.Component {
  state = {
    search: 'qweqe',
  }

  handleSearch = event => {
    console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <input defaultValue={this.state.search} onChange={this.handleSearch} />
      </div>
    )
  }
}

export default App;
