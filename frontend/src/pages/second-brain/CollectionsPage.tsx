import { VStack, HStack, Menu, MenuButton, Button, MenuList, MenuItem, SimpleGrid } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useGetCollections } from "../../hooks/collections"
import CollectionItem from "../../components/second-brain/CollectionItem";

const CollectionsPage = () => {
  const { data: response, isLoading } = useGetCollections();

  console.log(response);

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
    <SimpleGrid columns={2} gap={2}>
      { response?.data?.map((collection) => <CollectionItem collection={collection} />) }
    </SimpleGrid>
    </VStack>
}

export default CollectionsPage
