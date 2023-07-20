import io, { Socket } from 'socket.io-client'
import React, { createContext, useEffect, useState } from 'react'

interface SocketContextProps {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
})

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:4000', { transports: ['websocket'] })
    setSocket(newSocket)

    newSocket.on('join', (data) => {
      console.log(`Joined Room : ${data}`)
    })

    newSocket.on('connect', () => {
      console.log('Connecting to socket server...')
      newSocket.emit('join', 'room1')
    })

    newSocket.on('disconnect', () => {
      console.error('Disconnected from socket server')
      setTimeout(() => {
        console.info('Reconnecting to socket server...')
        newSocket.connect()
      }, 1000)
    })

    newSocket.on('error', () => {
      console.error('Error connecting to socket server')
      setTimeout(() => {
        console.info('Reconnecting to socket server...')
        newSocket.connect()
      }, 1000)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }
