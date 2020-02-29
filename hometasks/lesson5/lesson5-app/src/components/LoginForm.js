import React from 'react'
import propTypes from 'prop-types'
import { TextField } from './TextField'
import { withForm } from './withForm'

export const LoginFormView = props => {
  console.log(props)
  return (
    <form onSubmit={props.onSubmit} onChange={}>
      <TextField
        name="email"
        label="Email"
        value={props.values.email}
        error={props.errors.email}
        dirty={props.dirty.email}
        setFieldValue={props.setFieldValue}
        setFieldDirty={props.setFieldDirty}
        onBlur={() => {/** fsdsdfsdfsdfsdf */}}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={props.values.password}
        error={props.errors.password}
        dirty={props.dirty.password}
        setFieldValue={props.setFieldValue}
        setFieldDirty={props.setFieldDirty}
      />
    </form>
  )
}


export const LoginForm = withForm({
  validation: {},
  onSubmit: async values => {
    await fetch.post('/login')
  }
})(LoginFormView)

LoginForm.propTypes = {
  values: propTypes.shape({
    email: propTypes.string,
    password: propTypes.string,
  }),
  error: propTypes.shape({
    email: propTypes.string,
    password: propTypes.string,
  }),
  dirty: propTypes.shape({
    email: propTypes.bool,
    password: propTypes.bool,
  }),
  setFieldValue: propTypes.func,
  setFieldError: propTypes.func,
  setFieldDirty: propTypes.func,
  isSubmitting: propTypes.bool,
}