import React from 'react'

export const withForm = config => // { validation }
  BaseComponent => {  // непосредственно, HOC
    return class WithForm extends React.Component {
      state = {
        values: {},
        errors: {},
        dirty: {},
        isSubmitting: false,
      };

      handleSubmit = () => {
        this.setState({ isSubmitting: true })
        await config.onSubmit(this.state.values)
        this.setState({ isSubmitting: false })
      }

      setFieldValue = (name, value) => {
        this.setState(currentState => {
          const nextValues  = { ...currentState.values, [name]: value }

          //

          return {
            values: nextValues,
          }
        });
      };

      setFieldDirty = name => {
        this.setState(currentState => {
          return {
            dirty: { ...currentState.dirty, [name]: true }
          }
        });
      };

      render() {
        return (
          <BaseComponent 
            onSubmit={config.onSubmit}
            values={this.state.values}
            dirty={this.state.dirty}
            errors={this.state.errors}
            isSubmitting={this.state.isSubmitting}
            setFieldValue={this.setFieldValue}
            setFieldDirty={this.setFieldDirty}
            {...this.props}
          />
        )
      }
    }
  }