import { Box, Flex, Button, Input, HStack, Textarea, Text, useDisclosure, useToast, Grid, GridItem } from '@chakra-ui/react';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Note } from '../../services/notesService';
import React from 'react';
import DeleteNoteAlertDialog from './DeleteNoteAlertDialog';
import { useCreateNote, useUpdateNote, useDeleteNote } from '../../hooks/notes';

interface Props {
  note?: Note
}
const KnowledgeDetail = ({ note }: Props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const {isLoading: createNoteLoading, isSuccess: createNoteSuccess, createNote} = useCreateNote();
  const {isLoading: updateNoteLoading, updateNote} = useUpdateNote();
  const {isLoading: deleteNoteLoading, isSuccess: deleteNoteSuccess, deleteNote} = useDeleteNote();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const [title, setTitle] = useState<string>(note?.title || "");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const [body, setBody] = useState<string>(note?.body || "");
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);

  const onSave = () => {
    if (note === undefined) {
      toast({
        title: 'Note being created.',
        description: "We're saving your note.",
        status: 'info',
        duration: 1500,
        isClosable: true,
      })
      const newNote: Note = { title: title, body: body, _id: "", tags: [] };
      createNote(newNote);
    } else {
      toast({
        title: 'Note being updated.',
        description: "We're updating your note.",
        status: 'info',
        duration: 1500,
        isClosable: true,
        colorScheme: 'blue'
      })
      const updatedNote = { ...note, title: title, body: body };
      updateNote(note._id, updatedNote);

    }
  }

  const onDelete = () => {
    if (note !== undefined) {
      toast({
        title: 'Note being deleted.',
        description: "We're deleting this note.",
        status: 'warning',
        duration: 1000,
        isClosable: true,
        colorScheme: 'blue'
      })
      deleteNote(note._id);
    }
  }

  if (createNoteSuccess || deleteNoteSuccess) {
    navigate("/everything/notes");
  }

  return <><Grid
    height={'100%'}
    templateAreas={`"titlebar" "tags" "textarea"`}
    templateRows={"auto auto minmax(0, 1fr)"}
    gap={3}>
    <GridItem area="titlebar">
    <Flex gap={2} alignItems={'center'} height={'40px'}>
      <Button variant={'solid'} height={'100%'} onClick={() => navigate('/everything')}><BsChevronLeft color={'brand.primary'} /></Button>
      <Input
        height={'100%'}
        size={'lg'}
        fontSize={'2xl'}
        fontWeight={'bold'}
        type='text'
        placeholder='Title of your note.'
        value={title}
        variant={'filled'}
        onChange={handleTitleChange}
      />
      <Button variant={'solid'} background={'brand.primary'} color={'white'} onClick={onSave} disabled={deleteNoteLoading || updateNoteLoading || createNoteLoading}>
        { note === undefined ? "Create" : "Save" }
      </Button>
      <Button variant={'outline'} borderColor={'brand.primary'} color={'brand.primary'} onClick={onOpen} disabled={deleteNoteLoading}>
        Delete
      </Button>
    </Flex>
    </GridItem>
    <GridItem area="tags">
    <HStack>
      <Text fontWeight={'extrabold'}>Tags: </Text>
      { note?.tags.map((tag, index) => <Box border={'1px solid gray'} borderRadius={10} paddingX={4} key={index}>{ tag.name }</Box> )}
    </HStack>
    </GridItem>
    <GridItem area="textarea" paddingBottom={5}>
    <Textarea
      variant={'filled'}
      fontSize={'xl'}
      value={body}
      placeholder='Content of your note.'
      onChange={handleBodyChange}
      resize={'none'}
      height={'100%'}
    />
    </GridItem>
  </Grid> 
  <DeleteNoteAlertDialog cancelRef={cancelRef} isOpen={isOpen} onClose={onClose} action={onDelete} />
  </>
}

export default KnowledgeDetail;
