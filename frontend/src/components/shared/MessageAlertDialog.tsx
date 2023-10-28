import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { RefObject } from "react";

export interface AlertDetails {
  header: string;
  description: string;
  actionButtonMessage: string;
  cancelButtonMesage: string;
}

interface Props {
  alertDetails: AlertDetails;
  cancelRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
  isOpen: boolean;
  action: () => void;
}
const MessageAlertDialog = ({
  alertDetails,
  cancelRef,
  onClose,
  isOpen,
  action,
}: Props) => {
  const onActionClick = () => {
    action();
    onClose();
  };
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
        <AlertDialogHeader>{alertDetails.header}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{alertDetails.description}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            {alertDetails.cancelButtonMesage}
          </Button>
          <Button colorScheme="red" ml={3} onClick={onActionClick}>
            {alertDetails.actionButtonMessage}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MessageAlertDialog;
