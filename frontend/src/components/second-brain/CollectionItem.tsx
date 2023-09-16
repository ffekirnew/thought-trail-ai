import { VStack, Text, HStack, Spacer, Button } from "@chakra-ui/react"
import { Collection } from "../../services/collectionsService"
import { format } from "date-fns";

const formatDate = (date: Date) => {
  return format(new Date(date), 'MMM dd');
};

interface Props {
  collection: Collection
}
const CollectionItem = ({ collection }: Props) => {
  return <Button variant={'solid'} height={'auto'} textAlign={'left'} padding={5} borderRadius={10}>
    <VStack align={'left'} width={'100%'} gap={2}>
      <Text as={'h3'} fontSize={'2xl'} fontWeight={'bold'}>{ collection.name }</Text> 
      <Text as={'p'} fontSize={'md'} fontWeight={'light'}>{ collection.description }</Text>
      <HStack>
        <Text fontWeight={'light'}>{ formatDate(collection.updatedAt!) }</Text>
        <Spacer />
        <Text fontWeight={'light'}>{ collection.notes.length } Notes</Text>
      </HStack>
    </VStack>
  </Button>
}

export default CollectionItem
