import RoutesToggle from './RoutesToggle'
import SocketStatus from '../SocketStatus'
import ContractsModal from './ContractsModal'

import { Box, Flex, VStack } from '@chakra-ui/react'

export default function RightSidebar() {
  return (
    <Box p="2" h="100%" top={0} right={0} position="absolute">
      <Flex direction="column" align="end" justify="space-between" h="100%">
        <Box></Box>
        <Box>
          <VStack spacing="2" pb="4">
            <RoutesToggle />
            <ContractsModal />
          </VStack>
          <SocketStatus />
        </Box>
      </Flex>
    </Box>
  )
}
