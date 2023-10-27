import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Text,
} from "@chakra-ui/react"
import { BsChevronLeft } from "react-icons/bs"

const KnowledgeDetailSkeleton = () => {
  return (
    <Grid
      height={"100%"}
      templateAreas={`"titlebar" "tags" "textarea"`}
      templateRows={"auto auto minmax(0, 1fr)"}
      gap={3}
    >
      <GridItem area="titlebar">
        <Flex gap={2} alignItems={"center"} height={"40px"}>
          <Skeleton borderRadius={5} height={"100%"}>
            <Button>
              <BsChevronLeft />
            </Button>
          </Skeleton>
          <Skeleton borderRadius={5} height={"100%"} width={"100%"}></Skeleton>
          <Skeleton borderRadius={5} height={"100%"}>
            <Button>Create</Button>
          </Skeleton>
          <Skeleton borderRadius={5} height={"100%"}>
            <Button>Delete</Button>
          </Skeleton>
        </Flex>
      </GridItem>
      <GridItem area="tags">
        <HStack>
          <Skeleton borderRadius={5}>
            <Text fontWeight={"extrabold"}>Tags: </Text>
          </Skeleton>
        </HStack>
      </GridItem>
      <GridItem area="textarea" paddingBottom={5}>
        <Skeleton borderRadius={5} height={"100%"}></Skeleton>
      </GridItem>
    </Grid>
  )
}

export default KnowledgeDetailSkeleton
