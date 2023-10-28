import {
  Button,
  HStack,
  Show,
  Spacer,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Journal } from "../../services/journalsService";
import { useNavigate } from "react-router-dom";

const formatDate = (date: Date) => {
  if (date) return format(new Date(date), "MMM. dd, yyyy");
  return format(new Date(), "MMM. dd, yyyy");
};

interface Props {
  journal: Journal;
}

const JournalListItem = ({ journal }: Props) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const formattedDate = formatDate(journal.createdAt!);

  return (
    <VStack
      width={"100%"}
      paddingX={5}
      borderRadius={10}
      bg={colorMode === "dark" ? "gray.700" : "gray.100"}
      gap={5}
    >
      <Button
        variant={"unstyled"}
        height={"auto"}
        textAlign={"left"}
        onClick={() => navigate("/everything/journals/" + journal?._id)}
        width={"100%"}
        gap={5}
      >
        <VStack gap={2} paddingY={2} align={"left"}>
          <HStack width={"100%"} gap={5}>
            <Text fontWeight={"bold"} overflow={"hidden"}>
              {journal?.title}
            </Text>
            <Spacer />
            <Text fontWeight={"light"} width={"6rem"}>
              {formattedDate}
            </Text>
          </HStack>
          <Show above={"lg"}>
            <Text fontWeight={"light"} overflow={"hidden"}>
              {journal?.body}
            </Text>
          </Show>
        </VStack>
      </Button>
    </VStack>
  );
};

export default JournalListItem;
