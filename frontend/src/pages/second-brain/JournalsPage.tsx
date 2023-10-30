import {
  Button,
  Heading,
  IconButton,
  Menu,
  Text,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  VStack,
  Show,
  Flex,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useGetJournals } from "../../hooks/journals";
import JournalListItem from "../../components/second-brain/JournalListItem";
import JournalListItemSkeleton from "../../components/second-brain/skeletons/JournalListItemSkeleton";
import { BiGridAlt, BiListOl, BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useJournalQueryStore from "../../state/journalQueryStore";
import { useState } from "react";

const JournalsPage = () => {
  const navigate = useNavigate();
  const setOrdering = useJournalQueryStore((s) => s.setOrdering);
  const setOrderBy = useJournalQueryStore((s) => s.setOrderBy);
  const [orderingName, setOrderingName] = useState<string>("Ordering");

  const { data: journals, isLoading } = useGetJournals();
  const journalSkeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ];

  const setQueryParameters = (ordering: string, orderBy: string) => {
    setOrdering(ordering);
    setOrderBy(orderBy);

    orderBy = orderBy[0] == "c" ? "Created" : "Updated";
    ordering = ordering[0] == "a" ? "Ascending" : "Descending";

    setOrderingName(`Date ${orderBy}, ${ordering}`);
  };

  const onAddNewJournal = () => {
    navigate(`/everything/journals/new`);
  };

  return (
    <VStack height={"100%"} align={"left"}>
      <Heading>Journals</Heading>
      <Flex flexWrap={"wrap"} paddingBottom={3} gap={3}>
        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            {orderingName}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setQueryParameters("asc", "createdAt")}>
              Date Created, Ascending
            </MenuItem>
            <MenuItem onClick={() => setQueryParameters("desc", "createdAt")}>
              Date Created, Descending
            </MenuItem>
            <MenuItem onClick={() => setQueryParameters("asc", "updatedAt")}>
              Date Updated, Ascending
            </MenuItem>
            <MenuItem onClick={() => setQueryParameters("desc", "updatedAt")}>
              Date Updated, Descending
            </MenuItem>
          </MenuList>
        </Menu>
        <Button
          variant={"solid"}
          leftIcon={<BiPlus />}
          onClick={onAddNewJournal}
        >
          Add a new Journal
        </Button>
        <Spacer />
        <Show above={"lg"}>
          <IconButton aria-label={"change to grid view"}>
            <BiGridAlt />
          </IconButton>
          <IconButton
            aria-label={"change to grid view"}
            as={Button}
            variant={"outline"}
          >
            <BiListOl />
          </IconButton>
        </Show>
      </Flex>
      {isLoading &&
        journalSkeletons.map((skeleton) => (
          <JournalListItemSkeleton key={skeleton} />
        ))}
      {journals &&
        journals?.map((journal) => (
          <JournalListItem key={journal._id} journal={journal} />
        ))}
      {!isLoading && journals?.length == 0 && (
        <VStack height={"100%"} justifyContent={"center"}>
          <Button variant={"ghost"} onClick={onAddNewJournal}>
            <Text color={"gray.600"}>
              You don't have a journal. Start your journaling journey today!
            </Text>
          </Button>
        </VStack>
      )}
    </VStack>
  );
};

export default JournalsPage;
