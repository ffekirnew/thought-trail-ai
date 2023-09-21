import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useGetJournals } from '../../hooks/journals'
import JournalItem from '../../components/second-brain/JournalItem';
import JournalItemSkeleton from '../../components/second-brain/skeletons/JournalItemSkeleton';
import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const JournalPage = () => {
  const navigate = useNavigate();

  const { data: journals, isLoading } = useGetJournals();
  const journalSkeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const onAddNewJournal = () => {
    navigate(`/everything/journals/new`);
  }

  return <VStack align={'left'}>
    <HStack paddingBottom={3}>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>Order by</MenuButton>
        <MenuList>
          <MenuItem>Date Created</MenuItem>
          <MenuItem>Date Updated</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>Filter by</MenuButton>
        <MenuList>
          <MenuItem>Tag 1</MenuItem>
          <MenuItem>Tag 2</MenuItem>
          <MenuItem>Tag 3</MenuItem>
          <MenuItem>Tag 4</MenuItem>
        </MenuList>
      </Menu>
      <Button variant={'solid'} leftIcon={<BiPlus />} onClick={onAddNewJournal}>Add a new Journal</Button>
    </HStack>
    { isLoading && journalSkeletons.map((skeleton) => <JournalItemSkeleton key={skeleton} />) }
    { journals?.map((journal) => <JournalItem key={journal._id} journal={journal} />) }
  </VStack>
}

export default JournalPage
