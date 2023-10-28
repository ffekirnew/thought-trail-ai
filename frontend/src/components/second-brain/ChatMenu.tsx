import {
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useDisclosure,
  Heading,
  Spacer,
  Text,
  Show,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useGetCollections } from "../../hooks/collections";
import useChatParametersStore, {
  ChatBasis,
} from "../../state/useChatParametersStore";
import MessageAlertDialog, { AlertDetails } from "../shared/MessageAlertDialog";
import useChatStore from "../../state/useChatStore";
import { Collection } from "../../services/collectionsService";

interface LocalChatState {
  chatBasis?: ChatBasis;
  collection?: Collection;
}

const ChatMenu = () => {
  const { data: collections } = useGetCollections();
  const { chatParameters, setChatBasis, setCollection } =
    useChatParametersStore();

  const [localChatState, setLocalChatState] = useState<LocalChatState>({
    chatBasis: chatParameters.chatBasis,
    collection: chatParameters.collection,
  });

  const { chats, reset } = useChatStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const resetChatAlert: AlertDetails = {
    header: "Change chat basis and reset chat?",
    description:
      "ThoughtTrial AI will recalibrate to be based on the new basis.",
    cancelButtonMesage: "Cancel",
    actionButtonMessage: "Reset",
  };

  const onChangeChatBasis = (chatBasis: ChatBasis) => {
    setLocalChatState({ ...localChatState, chatBasis });
    if (chatBasis !== chatParameters.chatBasis && chats.length > 0) {
      onOpen();
    } else {
      setChatBasis(chatBasis);
    }
  };

  const resetAndChangeChatBasis = () => {
    setChatBasis(localChatState.chatBasis!);
  };

  const onChangeCollection = (collection: Collection) => {
    setLocalChatState({ ...localChatState, collection });
    if (
      collection !== chatParameters.collection &&
      chatParameters.collection &&
      chats.length > 0
    ) {
      onOpen();
    } else {
      setCollection(collection);
    }
  };

  const resetAndChangeCollection = () => {
    setCollection(localChatState.collection!);
  };

  return (
    <>
      <HStack>
        <Show above={"lg"}>
          <Heading>Chat</Heading>
        </Show>
        <Spacer />
        <Text>Based On:</Text>
        <Menu>
          <MenuButton
            as={Button}
            variant={"solid"}
            rightIcon={<BsChevronDown />}
          >
            {chatParameters.chatBasis || "Based On"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => onChangeChatBasis("Journal")}>
              Your Journal
            </MenuItem>
            <MenuItem onClick={() => onChangeChatBasis("Collection")}>
              A Collection
            </MenuItem>
          </MenuList>
        </Menu>
        {chatParameters.chatBasis === "Collection" && (
          <Menu>
            <MenuButton
              as={Button}
              variant={"solid"}
              rightIcon={<BsChevronDown />}
            >
              {chatParameters.collection?.name || "Collection"}
            </MenuButton>
            <MenuList>
              {collections?.map((collection) => (
                <MenuItem
                  key={collection._id}
                  onClick={() => onChangeCollection(collection)}
                >
                  {collection.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </HStack>
      <MessageAlertDialog
        alertDetails={resetChatAlert}
        onClose={onClose}
        action={() => {
          reset();
          if (localChatState.chatBasis != chatParameters.chatBasis) {
            return resetAndChangeChatBasis();
          }
          return resetAndChangeCollection();
        }}
        isOpen={isOpen}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default ChatMenu;
