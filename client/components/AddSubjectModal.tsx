import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React, { ReactElement, useRef, useState } from 'react'

interface AddSubjectModalProps {
  onSubjectAdded: Function
}

export default function AddSubjectModal(props: AddSubjectModalProps): ReactElement {

  const { onSubjectAdded } = props;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [subname, setSubname] = useState("");
  const initialRef = useRef(null);

  /**
   * Asynchronous function to handle the click event for adding a new subject.
   * @async
   * @function handleClick
   * @returns {Promise<void>}
   */
  async function handleClick(): Promise<void> {
    if (subname === "") return;

    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:8080/subject/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        subname
      })
    });
    onSubjectAdded();
    onClose();
  }


  return (
    <>
      <Button colorScheme='linkedin' marginTop={2} onClick={onOpen} fontSize={{ base: '10', md: '20' }} >ADD SUBJECT</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent textColor={'whiteAlpha.800'} bg={'#174a62'} >
          <ModalHeader>Add Subject</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Subject name</FormLabel>
              <Input ref={initialRef} onChange={(e) => { setSubname(e.target.value) }} placeholder='name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='twitter' color='black' mr={3} onClick={handleClick} >
              Save
            </Button>
            <Button colorScheme='gray' color='black' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
