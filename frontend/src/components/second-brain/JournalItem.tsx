import { Button, Checkbox, HStack, IconButton, Show, Spacer, Text, useColorMode } from "@chakra-ui/react";
import { BiSolidStar, BiStar } from "react-icons/bi";
import { format } from "date-fns";
import { Journal } from "../../services/journalsService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatDate = (date: Date) => {
  return format(new Date(date), 'MMM dd');
};

interface Props {
  journal: Journal;
}

const JournalItem = ({ journal }: Props) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [starred, setStarred] = useState<boolean>(false);
  const formattedDate = formatDate(journal.createdAt!);

  return (
      <HStack
        width={'100%'}
        border={'1px'}
        paddingX={5}
        borderRadius={5}
        borderColor={ colorMode === 'dark' ? 'gray.700' : 'gray.100' }
        gap={5}>
        <Checkbox />
        <IconButton
          onClick={() => {setStarred(!starred)}}
          aria-label={"favorite-journal"}
          icon={starred ? <BiSolidStar /> : <BiStar />}
          variant={'unstyled'} />
        <Button variant={'unstyled'} onClick={() => navigate('/everything/journals/' + journal._id)} width={'100%'}>
          <HStack width={'100%'}>
            <Text fontWeight={'bold'} overflow={'hidden'}>{ journal.title }</Text>
            <Show above={'lg'}>
              <Text fontWeight={'light'} overflow={'hidden'}>{ journal.body }</Text>
            </Show>
            <Spacer />
            <Text fontWeight={'bold'} width={'6rem'}>{ formattedDate }</Text>
          </HStack>
        </Button>
      </HStack>
  );
};

export default JournalItem;
