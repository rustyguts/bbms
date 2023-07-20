import SocketStatus from './SocketStatus'
import { Box, Flex } from '@chakra-ui/react'

export default function RightSidebar() {
  return (
    <Box p="2" h="100%" top={0} right={0} position="absolute">
      <Flex direction="column" align="end" justify="space-between" h="100%">
        <Box></Box>
        <SocketStatus />
      </Flex>
    </Box>
  )
}
