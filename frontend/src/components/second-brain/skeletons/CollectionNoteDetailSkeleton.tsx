import { Grid, GridItem, Flex, Skeleton, Button } from "@chakra-ui/react"
import { BsChevronLeft } from "react-icons/bs"

const CollectionNoteDetailSkeleton = () => {
  return <Grid
    height={'100%'}
    templateAreas={`"titlebar" "textarea"`}
    templateRows={"auto minmax(0, 1fr)"}
    gap={3}>
    <GridItem area="titlebar">
      <Flex gap={2} alignItems={'center'} height={'40px'}>
        <Skeleton borderRadius={5} height={'100%'}><Button><BsChevronLeft /></Button></Skeleton>
        <Skeleton borderRadius={5} height={'100%'} width={'100%'}></Skeleton>
        <Skeleton borderRadius={5} height={'100%'}><Button>Create</Button></Skeleton>
        <Skeleton borderRadius={5} height={'100%'}><Button>Delete</Button></Skeleton>
      </Flex>
    </GridItem>
    <GridItem area="textarea" paddingBottom={5}>
      <Skeleton borderRadius={5} height={'100%'}></Skeleton>
    </GridItem>
  </Grid> 

}

export default CollectionNoteDetailSkeleton
