import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Page } from './components/Page'
import { UserCard } from './components/UserCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Page></Page>
    </div>
  )
}

export default App
