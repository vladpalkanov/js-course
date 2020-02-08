import React from 'react'

export const withDirty = BaseComponent => {
  return class WithDirty extends React.Component {
    handleBlur = event => {
      if (!this.props.dirty) {
        this.props.setFieldDirty(this.props.name)
      }

      if (this.props.onBlur) {
        this.props.onBlur(event)
      }
    }

    handleChange = event => {
      if (!this.props.dirty) {
        this.props.setFieldDirty(this.props.name)
      }

      if (this.props.onChange) {
        this.props.onChange(event)
      }
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      )
    }
  }
}
