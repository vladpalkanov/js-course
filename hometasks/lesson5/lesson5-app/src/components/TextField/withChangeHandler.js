import React from 'react'

export const withChangeHandler = BaseComponent => {
  return class WithChangeHandler extends React.Component {
    onChange = event => {
      this.props.setFieldValue(this.props.name, event.target.value)

      if (this.props.onChange) {
        this.props.onChange(event)
      }
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          onChange={this.onChange}
        />
      )
    }
  }
}
