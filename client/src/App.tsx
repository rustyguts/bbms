import { SocketContext, socket } from './context/socket';

import GlobalMap from './components/GlobalMap';
import SocketManager from './components/SocketManager';

function App() {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <h1>logigame</h1>
        <SocketManager />
        <GlobalMap />
      </SocketContext.Provider>
    </>
  )
}

export default App
