import React, { useRef, useState } from 'react'
import css from './style.module.css'
import MyLink from './MyLink'
import useUserSearch from './hooks/useUserSearch'
import { Link } from 'react-router-dom'
import SuggestedUsers from '../SuggestedUsers'

function SearchBox() {
  
  let debounce = useRef(null)

  const [inputText, setInputText] = useState('')
  const [users, loading, searchUsers, setUsers] = useUserSearch()
  const [showSuggestedUsers, setShowSuggestedUsers] = useState(false)

  const processInputvalue = (value)=>{
    let valueArr = value.split("  ")
    let newValueArr = valueArr.filter((val)=>{
      return val.length !== 0
    })
    return newValueArr.join(" ") 
  }

  const inputHandler = (e)=>{
    let value = e.target.value
    let processedvalue = processInputvalue(value)
    setInputText(processedvalue)
    clearTimeout(debounce.current)
    debounce.current = setTimeout(() => {
      if(processedvalue.length !== 0) searchUsers(processedvalue)
    }, 300);
  }

  const clearUserSuggetion = ()=>{
    setInputText('')
    setUsers([])
  }

  return (
    <div className={`${css.dropdownContainer} my-2 container`}>
      <div className={`${css.dropdown}`}>
        <div className='d-flex'>
          <input type="text" tab='1' placeholder="Find user by name..." className={css.myInput} value={inputText} onChange={inputHandler} />
          <button className={`btn btn-lg btn-dark`} onClick={clearUserSuggetion} >X</button>
        </div>
        <div className={css.dropdownContent}>
          {
            users.length === 0 && inputText.length !== 0 ?
            <button className='text-center'>{
              loading ? 'Finding user...' : 'No results'
            }</button> :
            <>
              {
                users.map((user)=>{
                  return <MyLink receiverID={user.uid} key={user.uid}>
                      <div className='d-flex flex-row p-0 m-0'>
                        <img src={user.photoURL} className='mt-2' alt="user photo" height="40"/>
                        <div className='d-flex flex-column ms-2'>
                          <b>{user.displayName}</b>
                          <span>{user.email}</span>
                        </div>
                      </div>
                  </MyLink>
                })
              }
            </>
          }
        </div>
      </div>
      {showSuggestedUsers && <SuggestedUsers onClickHandler={()=>setShowSuggestedUsers(false)}/>}
      <button onClick={()=>setShowSuggestedUsers(true)} className='btn btn-sm btn-dark my-3 px-2'>
        See Suggested Users ➩➩➩
      </button>
    </div>
  )
}

export default SearchBox
