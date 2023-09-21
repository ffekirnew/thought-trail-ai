import { VStack, Text, HStack, Spacer, Button, Flex } from "@chakra-ui/react"
import { Collection } from "../../services/collectionsService"
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const formatDate = (date: Date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

interface Props {
  collection: Collection
}
const CollectionItem = ({ collection }: Props) => {
  const navigate = useNavigate();

  return <Button
      variant={'solid'}
      height={'auto'}
      textAlign={'left'}
      paddingY={5}
      paddingX={0}
      borderRadius={10}
      onClick={() => navigate(`/everything/collections/${collection.slug}`)}>
    <VStack align={'left'} width={'100%'} gap={3}>
      <Flex flexDir={'column'} paddingX={5} gap={3}>
        <Text as={'h3'} fontSize={'2xl'} fontWeight={'bold'} overflow={'hidden'}>{ collection.name }</Text> 
        <Text as={'p'} fontSize={'md'} fontWeight={'light'} overflow={'hidden'}>{ collection.description }</Text>
      </Flex>
      <HStack paddingX={5}>
        <Text fontWeight={'semibold'}>Last Interaction: { formatDate(collection.updatedAt!) }</Text>
        <Spacer />
        <Text fontWeight={'bold'}>{ collection.notes?.length } Notes</Text>
      </HStack>
    </VStack>
  </Button>
}

export default CollectionItem
