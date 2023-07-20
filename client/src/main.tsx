import * as React from 'react'

import App from './App.tsx'
import ReactDOM from 'react-dom/client'

import { theme } from './config/theme.ts'
import { ChakraProvider } from '@chakra-ui/react'
import { SocketProvider } from './components/SocketContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </SocketProvider>
  </React.StrictMode>
)
