import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useGetJournals } from '../../hooks/journals'
import JournalItem from '../../components/second-brain/JournalItem';

const JournalPage = () => {
  const { data: response, isLoading } = useGetJournals();

  if (isLoading) return <p>Loading...</p>

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
    { response?.data?.map((journal) => <JournalItem key={journal._id} journal={journal} />) }
  </VStack>
}

export default JournalPage
