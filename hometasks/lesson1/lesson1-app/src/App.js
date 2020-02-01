import React from 'react'

const withTooltip = Component => {
  class WithTooltip extends React.Component {
    state = { hovering: false }
    mouseOver = () => this.setState({ hovering: true })
    mouseOut = () => this.setState({ hovering: false })
  
    render() {
      return (
        <Component
          {...this.props}
          hovering={this.state.hovering}
          mouseOver={this.mouseOver}
          mouseOut={this.mouseOut}
        />
      )
    }
  }

  return WithTooltip
}

const loadData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      message: 'hello!'
    }), 2000)
  })
}

const withData = Component => {
  return class WithData extends React.Component {
    state = {
      data: null
    }

    async componentDidMount() {
      try {
        const data = await loadData()
        this.setState({ data })
      } catch (error) {

      }
    }

    render() {
      console.log(this.state)
      return (
        <Component {...this.props} data={this.state.data} />
      )
    }
  }
}

const TrendChartComponent = props => {
  return (
    <div>
      {props.hovering && <div>TOOLTIP!</div>}
      <div
        onMouseOver={props.mouseOver}
        onMouseOut={props.mouseOut}
      >
        Trend Chart content: {props.data && props.data.message}
      </div>
    </div>
  )
}

const compose = (...fns) => {
  return value => {
    let result = value;

    for (let fn of fns) {
      result = fn(result)
    }

    return result;
  }
}

const withPure = BaseComponent => {
  return class WithPure extends React.PureComponent {
    render() {
      return <BaseComponent {...this.props}  />
    }
  }
}

const enhancer = compose(
  withData,
  withTooltip,
  withPure,
)

const EnhancedTrendChart = enhancer(TrendChartComponent)

export default function App() {
  return (
    <TrendChart />
  )
}
