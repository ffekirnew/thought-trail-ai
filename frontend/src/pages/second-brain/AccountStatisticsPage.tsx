import { useGetUser } from "../../hooks/auth";
import userAvatar from "../../assets/user_avatar.png";
import {
  Avatar,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useGetJournals } from "../../hooks/journals";
import { useGetCollections } from "../../hooks/collections";

const AccountStatisticsPage = () => {
  const user = useGetUser();
  const { data: journals } = useGetJournals();
  const { data: collections } = useGetCollections();

  return (
    <VStack
      justifyContent={"center"}
      width={{ base: "100%", lg: "60%" }}
      height={"100%"}
      borderWidth={"1px"}
      borderRadius={10}
      borderColor={"gray.500"}
      overflow={"hidden"}
      bg={"gray.600"}
      margin={"auto"}
    >
      <form>
        <HStack padding={5} alignItems={"start"}>
          <Avatar
            src={userAvatar}
            size={"2xl"}
            bg={"gray.900"}
            borderWidth={"1px"}
            borderColor={"gray.500"}
          />
          <Spacer />
          <VStack>
            <Text>{journals?.length} Journals</Text>
            <Text>{collections?.length} Collections</Text>
          </VStack>
        </HStack>
        <VStack
          align={"left"}
          height={"100%"}
          width={"100%"}
          paddingX={10}
          gap={5}
          bg={"gray.700"}
          paddingY={5}
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Editable
              defaultValue={user.name[0].toUpperCase() + user.name.slice(1)}
            >
              <EditablePreview fontSize={"lg"} />
              <EditableInput fontSize={"xl"} />
            </Editable>
          </FormControl>
          <FormControl>
            <FormLabel size={"xs"}>Username</FormLabel>
            <Editable defaultValue={user.username}>
              <EditablePreview fontSize={"lg"} />
              <EditableInput fontSize={"xl"} />
            </Editable>
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Editable defaultValue={user.email}>
              <EditablePreview fontSize={"lg"} />
              <EditableInput fontSize={"xl"} />
            </Editable>
          </FormControl>
        </VStack>
      </form>
    </VStack>
  );
};

export default AccountStatisticsPage;
