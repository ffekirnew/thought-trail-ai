import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import DeleteNoteAlertDialog from "./DeleteNoteAlertDialog";
import { useDeleteNote } from "../../hooks/notes";
import { useNavigate } from "react-router-dom";

interface Props {
  noteId: string;
}

const EditMenu = ({ noteId }: Props) => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const {
    isLoading: deleteNoteLoading,
    isSuccess: deleteNoteSuccess,
    deleteNote,
  } = useDeleteNote();

  const onDeleteNote = () => {
    deleteNote(noteId);
  };

  if (deleteNoteSuccess) {
    navigate("/everything");
  }

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          variant={"outline"}
          disabled={deleteNoteLoading}
        >
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
      <DeleteNoteAlertDialog
        cancelRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        action={onDeleteNote}
      />
    </>
  );
};

export default EditMenu;
