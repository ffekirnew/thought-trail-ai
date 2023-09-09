import { Text, VStack } from '@chakra-ui/react'
import NoteItem from '../../components/second-brain/NoteItem'

export interface Note {
  id: number;
  title: string;
  tags: string[];
  body: string;
}

export const notes: Note[] = [
    { id: 1, title: "First Note", tags: ["first", "ai"], body: "this was the first note." },
    { id: 2, title: "First Note", tags: ["first", "ai"], body: "this was the first note." },
    { id: 3, title: "First Note", tags: ["first", "ai"], body: "this was the first note." },
    { id: 4, title: "First Note", tags: ["first", "ai"], body: "this was the first note." },
    { id: 5, title: "First Note", tags: ["first", "ai"], body: "this was the first note." },
    { id: 6, title: "First Note", tags: ["first", "ai"], body: "this was the first note." },
    { id: 7, title: "First Note", tags: ["first", "ai"], body: "this was the first note." },
    { id: 8, title: "First Note", tags: ["first", "ai"], body: "this was the first note." },
  ]

const KnowledgePage = () => {
  return <VStack align={'left'}>
    <Text fontWeight={'bold'}>August 2023</Text>
    { notes.map((note) => <NoteItem key={note.id} note={note} />) }
  </VStack>
}

export default KnowledgePage
