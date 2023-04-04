import React, { useContext, useState } from 'react'
import UserAuthContext from '../../contexts/UserAuthContext'
import useAuthentication from '../../hooks/useAuthentication'
import { Link } from 'react-router-dom'

function index() {

  const {currentUser} = useContext(UserAuthContext)
  const {logOutUser} = useAuthentication()
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="d-flex">
            <img src={currentUser.photoURL} className='rounded-circle' alt="user photo" height="36"/>
            <span className='my-auto ms-2'>Hi, {currentUser.displayName}</span>
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button onClick={logOutUser} className="active border border-1 rounded p-1" aria-current="page">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default index
