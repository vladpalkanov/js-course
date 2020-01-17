import React from 'react'

export const UserDetails = props => {
  return (
    <div className="user-details">
      <h2>Name: {props.name}</h2>
      <div>Age: {props.age}</div>
      <div>Sex: {props.sex}</div>
      <div>City: {props.city}</div>
      <div>Job Title: {props.jobTitle}</div>
    </div>
  )
}