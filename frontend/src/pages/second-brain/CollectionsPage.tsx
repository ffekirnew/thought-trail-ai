import { VStack, HStack, Menu, MenuButton, Button, MenuList, MenuItem, SimpleGrid, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useGetCollections } from "../../hooks/collections"
import CollectionItem from "../../components/second-brain/CollectionItem";
import CollectionItemSkeleton from "../../components/second-brain/skeletons/CollectionItemSkeleton";
import { useRef } from "react";
import AddNewCollectionForm from "../../components/second-brain/AddNewCollectionForm";
import { BiPlus } from "react-icons/bi";

const CollectionsPage = () => {
  const { data: response, isLoading } = useGetCollections();
  const collectionSkeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return <>
    <VStack align={'left'} paddingBottom={5}>
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
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
        { isLoading && collectionSkeletons.map((skeleton) => <CollectionItemSkeleton key={skeleton} />) }
        { response?.data?.map((collection) => <CollectionItem key={collection._id} collection={collection} />) }
      </SimpleGrid>
      <Button variant={'outline'} leftIcon={<BiPlus />} onClick={onOpen}>Add a new Collection</Button>
    </VStack>
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
      >
      <DrawerOverlay />
      <DrawerContent padding={0}>
        <DrawerBody padding={0}>
          <AddNewCollectionForm onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
}

export default CollectionsPage;
