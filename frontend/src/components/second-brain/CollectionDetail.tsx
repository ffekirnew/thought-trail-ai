import { Flex, VStack, Text, Button, HStack, Spacer } from "@chakra-ui/react";
import { Collection } from "../../services/collectionsService"
import CollectionNoteItem from "./CollectionNoteItem";
import { BiPlus, BiSolidTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDeleteCollection } from "../../hooks/collections";

interface Props {
  collection: Collection;
}
const CollectionDetail = ({ collection }: Props) => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, deleteCollection } = useDeleteCollection();

  const onDelete = () => {
    deleteCollection(collection._id!);
  }

  if (isSuccess) navigate(`/everything/collections`);

  return <VStack align={'left'} gap={5}>
    <HStack justifyContent={'space-between'}>
      <Text as={'h2'} fontSize={'2xl'} fontWeight={'bold'}>{ collection.name }</Text>
      <Button variant={'outline'} leftIcon={<BiSolidTrash />} onClick={onDelete}>
        { isLoading ? "Deleting..." : "Delete Collection" }
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
  </VStack>
}

export default CollectionDetail;
