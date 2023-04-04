import { Suspense } from 'react'
import './App.css'
import ChatAppRoutes from './routes/ChatAppRoutes'

function App() {
  return (
    <>
    <Suspense fallback={<h1>Loading page...</h1>}>
      <ChatAppRoutes/>
    </Suspense>
    </>
  )
}

export default App
