import { HStack, Box, Text, useColorMode, Spacer, Button } from "@chakra-ui/react";
import { Chat } from "../../state/useChatStore";
import useChatParametersStore from "../../state/useChatParametersStore";
import { Journal } from "../../services/journalsService";
import useNewJournalStore from "../../state/useNewJournalStore";
import { Note } from "../../services/notesService";
import useNewCollectionNoteStore from "../../state/useNewCollectionNoteStore";
import { useNavigate } from "react-router-dom";

interface Props {
  message: Chat
}

const botBackgroundColors = {
  "dark": "gray.600",
  "light": "gray.200"
}

const userBackgroundColors = {
  "dark": "gray.700",
  "light": "gray.300"
}

const ChatMessage = ({ message }: Props) => {
  const {colorMode} = useColorMode();
  const { chatParameters } = useChatParametersStore();

  const navigate = useNavigate();

  const setJournal = useNewJournalStore(s => s.setJournal);
  const setCollectionNote = useNewCollectionNoteStore(s => s.setNote);

  const onSave = () => {
    if (chatParameters.chatBasis === "Journal") {
      const newJournal: Journal = { body: message.body };
      setJournal(newJournal);
      navigate(`/everything/journals/new`);
    } else {
      const newNote: Note = { body: message.body };
      setCollectionNote(newNote);
      navigate(`/everything/collections/${chatParameters.collectionName}/notes/new`);
    }
  }

  return (<Box
    bg={message.sender === 'user' ? userBackgroundColors[colorMode] : botBackgroundColors[colorMode]}
    borderRadius={10}
    borderBottomRightRadius={message.sender === 'user' ? 0 : 10}
    borderBottomLeftRadius={message.sender === 'bot' ? 0 : 10}
    paddingY={3}
    paddingX={5}
    width={'95%'}
    marginLeft={message.sender === 'user' ? 'auto' : 0}
    marginRight={message.sender === 'user' ? 0 : 'auto'}
  >
    { message.sender === 'bot' &&
      <HStack>
        <Spacer />
        <Button variant={'solid'} size={'sm'} onClick={onSave} >Save</Button>
        <Button variant={'solid'} size={'sm'} >Regenerate</Button>
      </HStack>
    }
    <HStack align={'start'} gap={5}>
      <Text fontSize={'md'}>{ message.body }</Text>
    </HStack>
  </Box>);
}

export default ChatMessage;
