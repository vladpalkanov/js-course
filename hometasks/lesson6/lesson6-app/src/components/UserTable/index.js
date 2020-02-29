import React from 'react'
import { DataTable } from '../DataTable'
import { withData } from './withData'

const columns = [
  {
    id: 'firstName',
    title: 'Name',
    renderer: item => {
      const fullName = `${item.firstName} ${item.lastName}`
      return <a href={`/users/${item.id}`}>{fullName}</a>;
    },
    sortable: true,
  },
  {
    id: 'email',
    title: 'Email',
    renderer: item => item.email,
    sortable: true,
  },
  {
    id: 'phone',
    title: 'Phone Number',
    renderer: item => item.phone,
    sortable: true,
  },
  // {
  //   id: 'address',
  //   title: 'Address',
  //   renderer: item => item.address,
  // },
]

const UserTableView = props => {
  return (
    <DataTable
      columns={columns}
      {...props}
    />
  )
}

export const UserTable = withData(UserTableView)