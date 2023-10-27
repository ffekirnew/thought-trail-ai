import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react"
import { RefObject } from "react"

interface Props {
  cancelRef: RefObject<HTMLButtonElement>
  onClose: () => void
  isOpen: boolean
  action: () => void
}
const DeleteNoteAlertDialog = ({
  cancelRef,
  onClose,
  isOpen,
  action,
}: Props) => {
  const onActionClick = () => {
    action()
    onClose()
  }
  return (
    <AlertDialog
      motionPreset="slideInBottom"
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
          <Button colorScheme="red" ml={3} onClick={onActionClick}>
            Confirm Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteNoteAlertDialog
