import { useToast, useDisclosure, Grid, GridItem, Flex, Button, Input, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DeleteNoteAlertDialog from './DeleteNoteAlertDialog';
import { Note } from '../../services/notesService';
import { useAddNoteToCollection, useDeleteNoteFromCollection, useUpdateNoteInCollection } from '../../hooks/collections/notes';

interface Props {
  collectionSlug: string;
  note?: Note;
}
const CollectionNoteDetail = ({ collectionSlug, note }: Props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const addNoteToCollection = useAddNoteToCollection();
  const updateNoteInCollection = useUpdateNoteInCollection();
  const deleteNoteFromCollection = useDeleteNoteFromCollection();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const [title, setTitle] = useState<string>(note?.title || "");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const [body, setBody] = useState<string>(note?.body || "");
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);

  const onSave = () => {
    if (note === undefined || note._id === undefined) {
      toast({
        title: 'Note being created.',
        description: "We've added your note to the collection.",
        status: 'info',
        duration: 1500,
        isClosable: true,
      })
      const newNote: Note = { title: title, body: body, _id: "", tags: [], createdAt: new Date(), updatedAt: new Date() };
      addNoteToCollection.mutate({collectionSlug: collectionSlug, note: newNote });
      navigate(`/everything/collections/${collectionSlug}`);
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
      updateNoteInCollection.mutate({ collectionSlug: collectionSlug, noteId: note._id, note: updatedNote });
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
      deleteNoteFromCollection.mutate({ collectionSlug: collectionSlug, noteId: note?._id! });
    }
  }

  if (addNoteToCollection.isSuccess || deleteNoteFromCollection.isSuccess) {
    navigate(`/everything/collections/${collectionSlug}/`);
  }

  return <><Grid
    height={'100%'}
    templateAreas={`"titlebar" "textarea"`}
    templateRows={"auto minmax(0, 1fr)"}
    gap={3}>
    <GridItem area="titlebar">
    <Flex gap={2} alignItems={'center'} height={'40px'}>
      <Button variant={'solid'} height={'100%'} onClick={() => navigate(`/everything/collections/${collectionSlug}`)}><BsChevronLeft color={'brand.primary'} /></Button>
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
      <Button variant={'solid'} background={'brand.primary'} color={'white'} onClick={onSave} disabled={deleteNoteFromCollection.isLoading || updateNoteInCollection.isLoading || addNoteToCollection.isLoading}>
        { note === undefined || note._id === undefined ? "Create" : "Save" }
      </Button>
      <Button variant={'outline'} borderColor={'brand.primary'} color={'brand.primary'} onClick={onOpen} disabled={deleteNoteFromCollection.isLoading}>
        Delete
      </Button>
    </Flex>
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

export default CollectionNoteDetail;
