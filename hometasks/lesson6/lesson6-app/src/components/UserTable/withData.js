import React from 'react'
import { data as rawData } from './data'

const getUsers = params => {
  const { sortField, sortOrder } = params

  return new Promise(resolve => {
    setTimeout(() => {
      const sortedData = [...rawData].sort((a, b) => {
        const fieldA = a[sortField]
        const fieldB = b[sortField]

        if (typeof fieldA === 'string') {
          return (sortOrder === 'desc' && -1) * fieldA.localeCompare(fieldB)
        }

        // if (a > b) {
        //   return 1
        // } else if (a < b) {
        //   return -1
        // } else {
        //   return 0
        // }
      })
      resolve(sortedData)
    }, 1000)
  })
}

export const withData = BaseComponent => {
  return class WithData extends React.Component {
    state = {
      data: [],
      loading: false,
      params: {
        offset: 0,
        limit: 10,
        sortField: 'firstName',
        sortOrder: 'asc',
        search: '',
      },
    };

    setParams = nextParams => {
      this.setState(currentState => ({
        params: {
          ...currentState.params,
          ...nextParams,
        }
      }))
    }

    loadData = async () => {
      try {
        const data = await getUsers(this.state.params)

        this.setState(currentState => ({
          data: data,
          params: {
            ...currentState.params,
            offset: 0,
          },
        }))
      } catch (err) {

      }
    }

    componentDidMount () {
      this.loadData()
    }

    componentDidUpdate(_, nextState) {
      if (this.state.params !== nextState.params) {
        this.loadData()
      }
    }

    render() {
      return (
        <BaseComponent
          params={this.state.params}
          items={this.state.data}
          onParamsChange={this.setParams}
        />
      )
    }
  }
}