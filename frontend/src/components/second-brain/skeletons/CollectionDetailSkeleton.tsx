import { VStack, Flex, HStack, Button, Skeleton, Text } from "@chakra-ui/react";
import { BiSolidTrash } from "react-icons/bi";
import CollectionNoteItemSkeleton from "./CollectionNoteItemSkeleton";

const CollectionDetailSkeleton = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <VStack align={"left"} gap={5}>
      <HStack justifyContent={"space-between"}>
        <Skeleton borderRadius={10}>
          <Text as={"h2"} fontSize={"2xl"} fontWeight={"bold"}>
            Collection
          </Text>
        </Skeleton>
        <Skeleton borderRadius={10}>
          <Button leftIcon={<BiSolidTrash />}>Delete Collection</Button>
        </Skeleton>
      </HStack>
      <Flex flexDir={"column"} gap={2}>
        {skeletons.map((skeleton) => (
          <CollectionNoteItemSkeleton key={skeleton} />
        ))}
      </Flex>
    </VStack>
  );
};

export default CollectionDetailSkeleton;
