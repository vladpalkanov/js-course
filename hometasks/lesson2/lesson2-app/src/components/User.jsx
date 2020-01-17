import React from 'react'

export const User = props => {
  return (
    <div className="user-list__item">
      <h2>Name: {props.name}</h2>
      <div>Age: {props.age}</div>
      <div>Sex: {props.sex}</div>
    </div>
  )
}