import { DateTime } from 'luxon'
import { getPorts, getShips } from '../../api/api'
import { RiShipLine } from 'react-icons/ri'
import { useQuery } from '@tanstack/react-query'
import { BiSolidSend, BiChevronDown } from 'react-icons/bi'

import {
  Box,
  Card,
  Text,
  Flex,
  Menu,
  Modal,
  VStack,
  Button,
  Heading,
  CardBody,
  Progress,
  MenuItem,
  MenuList,
  ModalBody,
  IconButton,
  MenuButton,
  ButtonGroup,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Port } from '../../types'

export default function FleetModal() {
  const [selectedPort, setSelectedPort] = useState<Port | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const shipsQuery = useQuery({
    queryKey: ['ships'],
    queryFn: getShips,
  })

  const portsQuery = useQuery({
    queryKey: ['ports'],
    queryFn: getPorts,
  })

  return (
    <>
      <IconButton
        size="lg"
        variant="solid"
        onClick={onOpen}
        aria-label="Fleet"
        icon={<RiShipLine />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ml="1">Fleet Management</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="2">
              {shipsQuery?.data?.map((s) => {
                return (
                  <Card w="100%" variant="outline" key={s.id}>
                    <CardBody>
                      <Flex>
                        <Heading size="md">{s.name}</Heading>
                      </Flex>
                      <Flex justify="space-between">
                        <Text>Current Port</Text>
                        <Box>
                          <ButtonGroup size="sm" isAttached variant="solid">
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<BiChevronDown />}
                              >
                                {selectedPort?.id
                                  ? `Send to ${selectedPort.name}`
                                  : `Select Port`}
                              </MenuButton>
                              <MenuList>
                                {portsQuery?.data?.map((p) => {
                                  return (
                                    <MenuItem
                                      key={p.id}
                                      onClick={() => {
                                        setSelectedPort(p)
                                      }}
                                    >
                                      {p.name}
                                    </MenuItem>
                                  )
                                })}
                              </MenuList>
                            </Menu>
                            <IconButton
                              colorScheme="green"
                              aria-label="Dispatch"
                              icon={<BiSolidSend />}
                              isDisabled={!Boolean(selectedPort)}
                            />
                          </ButtonGroup>
                        </Box>
                      </Flex>
                      <Flex pt="4" w="100%" direction="column">
                        <Flex justify="space-between" pb="1">
                          <Flex direction="column">
                            <Heading size="sm" textAlign="left">
                              CA THU
                            </Heading>
                            <Text fontSize=".8rem">
                              {`ETD: ${DateTime.now().toISODate()}`}
                            </Text>
                          </Flex>
                          <Flex direction="column">
                            <Heading size="sm" textAlign="right">
                              CA MID
                            </Heading>
                            <Text fontSize=".8rem">
                              {`ETA: ${DateTime.now().toISODate()}`}
                            </Text>
                          </Flex>
                        </Flex>
                        <Box>
                          <Progress
                            rounded="md"
                            value={10}
                            w="100%"
                            size="xs"
                          />
                        </Box>
                      </Flex>
                    </CardBody>
                  </Card>
                )
              })}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
