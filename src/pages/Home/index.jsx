import React from 'react'
import Chats from '../../components/Chats/index'
import Navbar from '../../components/Navbar'
import SearchBox from '../../components/SearchBox'
function Home() {
  return (
    <div>
      <Navbar/>
      <SearchBox/>
      <Chats/>
    </div>
  )
}

export default Home
