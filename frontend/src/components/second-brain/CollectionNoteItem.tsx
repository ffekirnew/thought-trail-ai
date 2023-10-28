import {
  HStack,
  Checkbox,
  Button,
  Show,
  Spacer,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Note } from "../../services/notesService";
import { format } from "date-fns";

const formatDate = (date: Date) => {
  return format(new Date(date), "MMM dd");
};

interface Props {
  collectionSlug: string;
  note: Note;
}
const CollectionNoteItem = ({ collectionSlug, note }: Props) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const formattedDate = formatDate(note.updatedAt!);

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
        onClick={() => navigate("/everything/journals/" + collectionSlug)}
        width={"100%"}
        gap={5}
      >
        <VStack gap={2} paddingY={2} align={"left"} width={"100%"}>
          <HStack width={"100%"} gap={5}>
            <Text fontWeight={"bold"} overflow={"hidden"}>
              {note?.title}
            </Text>
            <Spacer />
            <Text fontWeight={"light"}>{formattedDate}</Text>
          </HStack>
          <Show above={"lg"}>
            <Text fontWeight={"light"} overflow={"hidden"}>
              {note?.body}
            </Text>
          </Show>
        </VStack>
      </Button>
    </VStack>
  );
};

export default CollectionNoteItem;
