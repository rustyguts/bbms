import { TbRoute } from 'react-icons/tb'
import { Box, IconButton, VStack } from '@chakra-ui/react'

export default function DrawingTools() {
  return (
    <Box position="absolute" top={0} left={0} p="2">
      <VStack spacing="2" align="start">
        <IconButton
          size="sm"
          variant="solid"
          icon={<TbRoute />}
          aria-label="Search database"
        />
      </VStack>
    </Box>
  )
}
