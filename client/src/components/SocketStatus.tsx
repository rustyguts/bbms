import { Box, Text } from '@chakra-ui/react'
import { SocketContext } from './SocketContext'
import { useContext, useEffect, useMemo, useState } from 'react'

export default function SocketStatus() {
  const [latency, setLatency] = useState<number>(0)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    function handleConnection() {
      if (socket) {
        const start = Date.now()
        socket.volatile.emit('ping')

        socket.on('ping', () => {
          const latency = Date.now() - start
          setLatency(latency)
        })
      }
    }

    // Run it once on mount quickly
    setTimeout(() => {
      handleConnection()
    }, 1000)

    // Run every 5 seconds until unmouted
    const intervalId = setInterval(handleConnection, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const color = useMemo(() => {
    if (socket?.disconnected) return 'red'
    return latency < 100 ? 'green' : latency < 200 ? 'yellow' : 'red'
  }, [latency, socket])

  if (!socket?.connected) return null

  return (
    <Box>
      <Text fontFamily="mono" color={color}>
        {socket?.connected ? `${latency}ms` : 'Disconnected'}
      </Text>
    </Box>
  )
}
