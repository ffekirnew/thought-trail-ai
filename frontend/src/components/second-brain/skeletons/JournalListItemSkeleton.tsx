import { Skeleton } from "@chakra-ui/react";
import JournalListItem from "../JournalListItem";
import { Journal } from "../../../services/journalsService";

const JournalListItemSkeleton = () => {
  return (
    <Skeleton borderRadius={10}>
      <JournalListItem journal={{} as Journal} />
    </Skeleton>
  );
};

export default JournalListItemSkeleton;
