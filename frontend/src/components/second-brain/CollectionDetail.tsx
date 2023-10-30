import {
  Flex,
  VStack,
  Text,
  Button,
  useToast,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
import { Collection } from "../../services/collectionsService";
import CollectionNoteItem from "./CollectionNoteItem";
import { BiPlus, BiSolidTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDeleteCollection } from "../../hooks/collections";
import React from "react";
import DeleteCollectionAlertDialog from "./DeleteCollectionAlertDialog";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  collection: Collection;
}
const CollectionDetail = ({ collection }: Props) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const deleteCollection = useDeleteCollection();

  const onAddNoteToCollection = () => {
    navigate(`/everything/collections/${collection.slug}/notes/new`);
  };

  const onDelete = () => {
    deleteCollection.mutate(collection._id!);
    toast({
      title: "Collection being deleted.",
      description: "We're deleting this the collection.",
      status: "warning",
      duration: 1000,
      isClosable: true,
      colorScheme: "blue",
    });
    navigate(`/everything/collections`);
  };

  return (
    <VStack height={"100%"} align={"left"} gap={5}>
      <Flex justifyContent={"space-between"}>
        <Text as={"h2"} fontSize={"2xl"} fontWeight={"bold"}>
          {collection.name}
        </Text>
        <Show above={"lg"}>
          <Button
            variant={"outline"}
            leftIcon={<BiSolidTrash />}
            onClick={onOpen}
          >
            {deleteCollection.isLoading ? "Deleting..." : "Delete Collection"}
          </Button>
        </Show>
        <Show below={"lg"}>
          <Button variant={"outline"} onClick={onOpen}>
            <BiSolidTrash />
          </Button>
        </Show>
      </Flex>
      <Text as={"p"} fontSize={"md"} fontWeight={"light"}>
        {collection.description}
      </Text>
      <Flex flexWrap={"wrap-reverse"} gap={3}>
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
              Order by
            </MenuButton>
            <MenuList>
              <MenuItem>Date Created, Ascending</MenuItem>
              <MenuItem>Date Created, Descending</MenuItem>
              <MenuItem>Date Updated, Ascending</MenuItem>
              <MenuItem>Date Updated, Descending</MenuItem>
            </MenuList>
          </Menu>
        <Button
          onClick={onAddNoteToCollection}
          variant={"solid"}
          leftIcon={<BiPlus />}
        >
          Add a new note
        </Button>
      </Flex>

      <Flex flexDir={"column"} gap={2} height={"100%"}>
        {collection.notes?.map((note) => (
          <CollectionNoteItem
            key={note._id}
            note={note}
            collectionSlug={collection.slug!}
          />
        ))}
        {collection?.notes?.length == 0 && (
          <VStack height={"100%"} justifyContent={"center"}>
            <Button variant={"ghost"} onClick={onAddNoteToCollection}>
              <Text color={"gray.600"}>
                You don't have a note in this collection. Add a note!
              </Text>
            </Button>
          </VStack>
        )}
      </Flex>
      <DeleteCollectionAlertDialog
        cancelRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        action={onDelete}
      />
    </VStack>
  );
};

export default CollectionDetail;
