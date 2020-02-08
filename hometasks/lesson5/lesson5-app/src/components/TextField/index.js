import React from 'react'
import propTypes from 'prop-types'
import { withChangeHandler } from './withChangeHandler'
import { withDirty } from './withDirty'

const TextFieldView = props => {
  const isError = props.error && props.dirty
  const fieldId = `textfield_${props.name}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {props.label && <label htmlFor={fieldId}>{props.label}</label>}
      <input
        name={props.name}
        type={props.type}
        id={fieldId}
        style={{ border: `1px solid ${isError ? 'red' : 'black'}` }}
        value={props.value || ''}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {isError && <div style={{ color: 'red' }}>{props.error}</div>}
    </div>
  )
}

TextFieldView.defaultProps = {
  type: 'text',
}

TextFieldView.propTypes = {
  name: propTypes.string,
  type: propTypes.oneOf([
    'text',
    'password',
    'number',
    'email',
  ]),
  value: propTypes.string,
  label: propTypes.string,
  error: propTypes.string,
  onChange: propTypes.func,
}

export const TextField = withDirty(withChangeHandler(TextFieldView))