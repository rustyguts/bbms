import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";

export default function TopBar() {
  return (
    <Flex h='50px' p='2' justify='space-between' align='center'>
      <Box>
        <Heading pl='4' size='sm'> Rusty's Shipping Manager </Heading>
      </Box>
      <Box>
        <Avatar size='sm' name="Rusty" />
      </Box>
    </Flex>
  )
}
