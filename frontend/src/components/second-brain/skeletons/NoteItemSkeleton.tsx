import { Flex, Spacer, Button, Skeleton, Show } from "@chakra-ui/react";
import { BsPencil } from "react-icons/bs";
import EditMenu from "../EditMenu";

const NoteItemSkeleton = () => {
  return <Flex borderColor={'gray.700'} gap={1} borderRadius={10} alignItems={'center'}>
    <Skeleton borderRadius={5} width={'100%'}><Button as={'h3'}>Some title</Button></Skeleton>
    <Spacer />
    <Show above='lg'>
      <EditMenu noteId={'10'} />
    </Show>
    <Button onClick={() => {}} variant={'outline'}><BsPencil /></Button>
  </Flex> 
}

export default NoteItemSkeleton;
