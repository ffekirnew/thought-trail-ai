import { Flex, VStack, Text, Button, HStack, Spacer, useToast, useDisclosure } from "@chakra-ui/react";
import { Collection } from "../../services/collectionsService"
import CollectionNoteItem from "./CollectionNoteItem";
import { BiPlus, BiSolidTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDeleteCollection } from "../../hooks/collections";
import React from "react";
import DeleteCollectionAlertDialog from "./DeleteCollectionAlertDialog";

interface Props {
  collection: Collection;
}
const CollectionDetail = ({ collection }: Props) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const deleteCollection = useDeleteCollection();

  const onDelete = () => {
    deleteCollection.mutate(collection._id!);
    toast({
        title: 'Collection being deleted.',
        description: "We're deleting this the collection.",
        status: 'warning',
        duration: 1000,
        isClosable: true,
        colorScheme: 'blue'
      });
    navigate(`/everything/collections`);
  }

  return <VStack align={'left'} gap={5}>
    <HStack justifyContent={'space-between'}>
      <Text as={'h2'} fontSize={'2xl'} fontWeight={'bold'}>{ collection.name }</Text>
      <Button variant={'outline'} leftIcon={<BiSolidTrash />} onClick={onOpen}>
        { deleteCollection.isLoading ? "Deleting..." : "Delete Collection" }
      </Button>
    </HStack>
    <Text as={'p'} fontSize={'md'} fontWeight={'light'}>{ collection.description }</Text>
    <Flex flexDir={'column'} gap={2}>
      { collection.notes?.map((note) => <CollectionNoteItem key={note._id} note={note} collectionSlug={collection.slug!} /> ) }
    </Flex>
    <HStack>
      <Spacer />
      <Button onClick={() => navigate(`/everything/collections/${collection.slug}/notes/new`)} variant={'solid'} leftIcon={<BiPlus />}>Add a new note</Button>
    </HStack>
    <DeleteCollectionAlertDialog cancelRef={cancelRef} isOpen={isOpen} onClose={onClose} action={onDelete} />
  </VStack>
}

export default CollectionDetail;
