import { Menu, MenuButton, Button, MenuList, MenuItem, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

const EditMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return <><Menu>
  <MenuButton as={Button} variant={'ghost'}>
    <BsThreeDots />
  </MenuButton>
  <MenuList>
    <MenuItem onClick={onOpen}>Delete Note</MenuItem>
    <MenuItem>Summerize Note</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Add as Task</MenuItem>
    <MenuItem>Add to plans</MenuItem>
  </MenuList>
</Menu>
  <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete this note?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You will not be able to recover this note.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' ml={3}>
              Confirm Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  </>

}

export default EditMenu