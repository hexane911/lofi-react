import { useEffect } from 'react'
import './App.css'

import Player from './components/player/Player'
import { Provider, useSelector } from 'react-redux'
import { getUUID } from './redux/uuidSlice'
import { store } from './redux/store'

function App() {

  return (
    <Provider store={store}> 
      <div className='App'>
      <Player />
    </div>

    </Provider>
  )
}

export default App