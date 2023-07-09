import {
  useQuery,
} from '@tanstack/react-query'
import { getStatus } from './api/api'

function App() {
  const query = useQuery({ queryKey: ['status'], queryFn: getStatus })

  return (
    <>
      <h1>logigame</h1>
      <p> API Status:</p>
      <p> {query?.data ? query.data : "disconnected" }</p>
    </>
  )
}

export default App
