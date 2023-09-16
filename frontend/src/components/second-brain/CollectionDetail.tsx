import { Flex, VStack, Text, Button, HStack, Spacer } from "@chakra-ui/react";
import { Collection } from "../../services/collectionsService"
import CollectionNote from "./CollectionNote";

interface Props {
  collection: Collection;
}
const CollectionDetail = ({ collection }: Props) => {
  return <VStack align={'left'} gap={5}>
    <Text as={'h2'} fontSize={'2xl'} fontWeight={'bold'}>{ collection.name }</Text>
    <Text as={'p'} fontSize={'md'} fontWeight={'light'}>{ collection.description }</Text>
    <Flex flexDir={'column'} gap={2}>
      { collection.notes.map((note) => <CollectionNote note={note} /> ) }
    </Flex>
    <HStack>
      <Spacer />
      <Button variant={'solid'}>Add a new note</Button>
      </HStack>
  </VStack>
}

export default CollectionDetail
