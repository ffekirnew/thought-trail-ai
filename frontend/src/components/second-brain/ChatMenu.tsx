import { HStack, Menu, MenuButton, Button, MenuList, MenuItem, useDisclosure, Heading, Spacer, Text, Show } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { useGetCollections } from '../../hooks/collections';
import useChatParametersStore, { ChatBasis } from '../../state/useChatParametersStore';
import MessageAlertDialog, { AlertDetails } from '../shared/MessageAlertDialog';
import useChatStore from '../../state/useChatStore';

interface LocalChatState {
  chatBasis?: ChatBasis,
  collectionName?: string;
}

const ChatMenu = () => {
  const { data: collections } = useGetCollections();
  const { chatParameters, setChatBasis, setCollectionName } = useChatParametersStore();

  const [ localChatState, setLocalChatState ] = useState<LocalChatState>({
    chatBasis: chatParameters.chatBasis,
    collectionName: chatParameters.collectionName
  });

  const { chats, reset } = useChatStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const resetChatAlert: AlertDetails = {
    header: "Change chat basis and reset chat?",
    description: "ThoughtTrial AI will recalibrate to be based on the new basis.",
    cancelButtonMesage: "Cancel",
    actionButtonMessage: "Reset"
  }

  const onChangeChatBasis = (chatBasis: ChatBasis) => {
    setLocalChatState({ ...localChatState, chatBasis })
    if (chatBasis !== chatParameters.chatBasis && chats.length > 0) {
      onOpen();
    } else {
      setChatBasis(localChatState.chatBasis!);
    }
  }

  const resetAndChangeChatBasis = () => {
    setChatBasis(localChatState.chatBasis!);
  }

  const onChangeCollection = (collectionName: string) => {
    setLocalChatState({ ...localChatState, collectionName })
    if (collectionName !== chatParameters.collectionName && chatParameters.collectionName && chats.length > 0) {
      onOpen();
    } else {
      setCollectionName(collectionName);
    }
  }

  const resetAndChangeCollection = () => {
    setCollectionName(localChatState.collectionName!);
  }

  return <><HStack>
    <Show above={'lg'}><Heading>Chat</Heading></Show>
    <Spacer />
    <Text>Based On:</Text>
    <Menu>
      <MenuButton as={Button} variant={'solid'} rightIcon={<BsChevronDown />}>{ chatParameters.chatBasis || "Based On"}</MenuButton>
      <MenuList>
        <MenuItem onClick={() => onChangeChatBasis("Journal")}>Your Journal</MenuItem>
        <MenuItem onClick={() => onChangeChatBasis("Collection")}>A Collection</MenuItem>
      </MenuList>
    </Menu>
    { chatParameters.chatBasis === "Collection" &&
    <Menu>
      <MenuButton as={Button} variant={'solid'} rightIcon={<BsChevronDown />}>{ chatParameters.collectionName || "Collection" }</MenuButton>
      <MenuList>
        { collections?.data?.map((collection) => <MenuItem key={collection._id} onClick={() => onChangeCollection(collection.name!)}>{ collection.name }</MenuItem> ) }
      </MenuList>
    </Menu> }
  </HStack>
  <MessageAlertDialog alertDetails={resetChatAlert} onClose={onClose} action={() => {
    reset();
    if (localChatState.chatBasis != chatParameters.chatBasis) {
      return resetAndChangeChatBasis();
    } return resetAndChangeCollection();
  }} isOpen={isOpen} cancelRef={cancelRef}  />
  </>
}

export default ChatMenu
