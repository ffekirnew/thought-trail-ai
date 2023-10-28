import {
  VStack,
  Text,
  HStack,
  Spacer,
  Button,
  Skeleton,
} from "@chakra-ui/react";

const CollectionItemSkeleton = () => {
  return (
    <Skeleton borderRadius={10}>
      <Button height={"auto"} textAlign={"left"} padding={5}>
        <VStack align={"left"} width={"100%"} gap={2}>
          <Text
            as={"h3"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            overflow={"hidden"}
          >
            Collection Name
          </Text>
          <Text
            as={"p"}
            fontSize={"md"}
            fontWeight={"light"}
            overflow={"hidden"}
          >
            Collection Description
          </Text>
          <HStack>
            <Text fontWeight={"light"}>Some Text</Text>
            <Spacer />
            <Text fontWeight={"light"}>Length Notes</Text>
          </HStack>
        </VStack>
      </Button>
    </Skeleton>
  );
};

export default CollectionItemSkeleton;
