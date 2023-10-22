import JournalDetail from "../../components/second-brain/JournalDetail";
import useNewJournalStore from "../../state/useNewJournalStore";

const AddNewJournalPage = () => {
  const journal = useNewJournalStore((s) => s.journal);

  return <JournalDetail journal={journal} />;
};

export default AddNewJournalPage;
