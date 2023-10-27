import {
  HStack,
  Checkbox,
  Button,
  Show,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Note } from "../../services/notesService"
import { format } from "date-fns"

const formatDate = (date: Date) => {
  return format(new Date(date), "MMM dd")
}

interface Props {
  collectionSlug: string
  note: Note
}
const CollectionNoteItem = ({ collectionSlug, note }: Props) => {
  const navigate = useNavigate()
  const { colorMode } = useColorMode()
  const formattedDate = formatDate(note.updatedAt!)

  return (
    <HStack
      width={"100%"}
      border={"1px"}
      paddingX={5}
      borderRadius={10}
      borderColor={colorMode === "dark" ? "gray.700" : "gray.100"}
      gap={5}
    >
      <Checkbox />
      <Button
        variant={"unstyled"}
        onClick={() =>
          navigate(
            `/everything/collections/${collectionSlug}/notes/${note._id}`,
          )
        }
        width={"100%"}
      >
        <HStack width={"100%"}>
          <Text fontWeight={"bold"} overflow={"hidden"}>
            {note.title}
          </Text>
          <Show above={"lg"}>
            <Text fontWeight={"light"} overflow={"hidden"}>
              {note.body}
            </Text>
          </Show>
          <Spacer />
          <Text fontWeight={"bold"} width={"6rem"}>
            {formattedDate}
          </Text>
        </HStack>
      </Button>
    </HStack>
  )
}

export default CollectionNoteItem
