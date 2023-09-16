import { Flex, Button, Input, Textarea, useDisclosure, useToast, Grid, GridItem } from '@chakra-ui/react';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Journal } from '../../services/journalsService';
import React from 'react';
import DeleteJournalAlertDialog from './DeleteJournalAlertDialog';
import { useCreateJournal, useUpdateJournal, useDeleteJournal } from '../../hooks/journals';

interface Props {
  journal?: Journal
}
const JournalDetail = ({ journal }: Props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const {isLoading: createJournalLoading, isSuccess: createJournalSuccess, createJournal} = useCreateJournal();
  const {isLoading: updateJournalLoading, updateJournal} = useUpdateJournal();
  const {isLoading: deleteJournalLoading, isSuccess: deleteJournalSuccess, deleteJournal} = useDeleteJournal();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const [title, setTitle] = useState<string>(journal?.title || "");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const [body, setBody] = useState<string>(journal?.body || "");
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);

  const onSave = () => {
    if (journal === undefined) {
      toast({
        title: 'Journal being created.',
        description: "We're saving your journal.",
        status: 'info',
        duration: 1500,
        isClosable: true,
      })
      const newJournal: Journal = { title: title, body: body, _id: "" };
      createJournal(newJournal);
    } else {
      toast({
        title: 'Journal being updated.',
        description: "We're updating your journal.",
        status: 'info',
        duration: 1500,
        isClosable: true,
        colorScheme: 'blue'
      })
      const updatedJournal = { ...journal, title: title, body: body };
      updateJournal(journal._id, updatedJournal);

    }
  }

  const onDelete = () => {
    if (journal !== undefined) {
      toast({
        title: 'Journal being deleted.',
        description: "We're deleting this journal.",
        status: 'warning',
        duration: 1000,
        isClosable: true,
        colorScheme: 'blue'
      })
      deleteJournal(journal._id);
    }
  }

  if (createJournalSuccess || deleteJournalSuccess) {
    navigate("/everything/journals");
  }

  return <><Grid
    height={'100%'}
    templateAreas={`"titlebar" "textarea"`}
    templateRows={"auto minmax(0, 1fr)"}
    gap={3}>
    <GridItem area="titlebar">
    <Flex gap={2} alignItems={'center'} height={'40px'}>
      <Button variant={'solid'} height={'100%'} onClick={() => navigate('/everything/journals')}><BsChevronLeft color={'brand.primary'} /></Button>
      <Input
        height={'100%'}
        size={'lg'}
        fontSize={'2xl'}
        fontWeight={'bold'}
        type='text'
        placeholder='Title of your journal.'
        value={title}
        variant={'filled'}
        onChange={handleTitleChange}
      />
      <Button variant={'solid'} background={'brand.primary'} color={'white'} onClick={onSave} disabled={deleteJournalLoading || updateJournalLoading || createJournalLoading}>
        { journal === undefined ? "Create" : "Save" }
      </Button>
      <Button variant={'outline'} borderColor={'brand.primary'} color={'brand.primary'} onClick={onOpen} disabled={deleteJournalLoading}>
        Delete
      </Button>
    </Flex>
    </GridItem>
    <GridItem area="textarea" paddingBottom={5}>
    <Textarea
      variant={'filled'}
      fontSize={'xl'}
      value={body}
      placeholder='Content of your journal.'
      onChange={handleBodyChange}
      resize={'none'}
      height={'100%'}
    />
    </GridItem>
  </Grid> 
  <DeleteJournalAlertDialog cancelRef={cancelRef} isOpen={isOpen} onClose={onClose} action={onDelete} />
  </>
}

export default JournalDetail;
