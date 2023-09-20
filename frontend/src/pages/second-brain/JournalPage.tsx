import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useGetJournals } from '../../hooks/journals'
import JournalItem from '../../components/second-brain/JournalItem';
import JournalItemSkeleton from '../../components/second-brain/skeletons/JournalItemSkeleton';

const JournalPage = () => {
  const { data: journals, isLoading } = useGetJournals();
  const journalSkeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return <VStack align={'left'}>
    <HStack>
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
    </HStack>
    { isLoading && journalSkeletons.map((skeleton) => <JournalItemSkeleton key={skeleton} />) }
    { journals?.map((journal) => <JournalItem key={journal._id} journal={journal} />) }
  </VStack>
}

export default JournalPage
