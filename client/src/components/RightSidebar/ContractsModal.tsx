import {
  Modal,
  Button,
  ModalBody,
  IconButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react'
import { GoContainer } from 'react-icons/go'

export default function ContractsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        size="lg"
        variant="solid"
        onClick={onOpen}
        aria-label="Contracts"
        icon={<GoContainer />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contracts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Body</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
