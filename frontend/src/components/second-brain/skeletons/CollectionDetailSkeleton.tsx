import {
  VStack,
  Flex,
  HStack,
  Spacer,
  Button,
  SkeletonText,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { BiPlus, BiSolidTrash } from "react-icons/bi";
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
      <SkeletonText
        mt="2"
        noOfLines={3}
        spacing="2"
        skeletonHeight="4"
        borderRadius={10}
      />
      <Flex flexDir={"column"} gap={2}>
        {skeletons.map((skeleton) => (
          <CollectionNoteItemSkeleton key={skeleton} />
        ))}
      </Flex>
      <HStack>
        <Spacer />
        <Skeleton>
          <Button leftIcon={<BiPlus />}>Add a new note</Button>
        </Skeleton>
      </HStack>
    </VStack>
  );
};

export default CollectionDetailSkeleton;
