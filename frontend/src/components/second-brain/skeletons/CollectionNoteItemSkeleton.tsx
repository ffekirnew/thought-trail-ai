import {
  HStack,
  Checkbox,
  Button,
  Show,
  Spacer,
  Text,
  Skeleton,
} from "@chakra-ui/react";

const CollectionNoteItemSkeleton = () => {
  return (
    <Skeleton borderRadius={10}>
      <HStack width={"100%"} border={"1px"} paddingX={5} gap={5}>
        <Checkbox />
        <Button width={"100%"}>
          <HStack width={"100%"}>
            <Text>Note Title</Text>
            <Show above={"lg"}>
              <Text>Note body</Text>
            </Show>
            <Spacer />
            <Text fontWeight={"bold"} width={"6rem"}>
              Date
            </Text>
          </HStack>
        </Button>
      </HStack>
    </Skeleton>
  );
};

export default CollectionNoteItemSkeleton;
