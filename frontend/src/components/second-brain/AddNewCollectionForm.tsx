import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spacer,
  Spinner,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isError } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateCollection } from "../../hooks/collections";
import { Collection } from "../../services/collectionsService";

const schema = z.object({
  name: z.string().min(3, {
    message: "Collection name needs needs to be at least 3 letters long.",
  }),
  description: z.string().min(10, {
    message: "Collection description needs to be longer than 10 letters.",
  }),
});

type AddNewCollectionFormSchema = z.infer<typeof schema>;

interface Props {
  onClose: () => void;
}
const AddNewCollectionForm = ({ onClose }: Props) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNewCollectionFormSchema>({ resolver: zodResolver(schema) });

  const createCollection = useCreateCollection();

  const onSubmit = (data: FieldValues) => {
    const newCollection: Collection = {
      name: data.name,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    createCollection.mutate(newCollection);
    toast({
      title: "New collection created.",
      description:
        "We have created your new collection. Start by adding notes to it.",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack height={"100vh"} align={"left"} gap={5} paddingY={5}>
        <Heading borderBottomWidth={"1px"} paddingX={5} paddingBottom={5}>
          Create a new Collection
        </Heading>
        <Box paddingX={5} gap={5}>
          <FormControl isInvalid={errors.name != undefined}>
            <FormLabel>Collection Name</FormLabel>
            <Input
              variant={"filled"}
              disabled={createCollection.isLoading}
              type="text"
              {...register("name")}
            />
            {!isError ? (
              <FormHelperText>
                Enter the name of your new collection.
              </FormHelperText>
            ) : (
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.description != undefined}>
            <FormLabel>Collection Description</FormLabel>
            <Textarea
              variant={"filled"}
              disabled={createCollection.isLoading}
              {...register("description")}
            />
            {!isError ? (
              <FormHelperText>
                Add a description for your new collection.
              </FormHelperText>
            ) : (
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            )}
          </FormControl>
          {createCollection.isLoading && <Spinner />}
          {createCollection.isError && (
            <Text color={"red.400"}>{createCollection.error.message}</Text>
          )}
          {createCollection.isSuccess && (
            <Text color={"green"}>Your collection has been created</Text>
          )}
        </Box>
        <Spacer />
        <HStack
          justifyContent={"right"}
          paddingTop={5}
          borderTopWidth={"1px"}
          paddingX={5}
        >
          <Button
            type={"submit"}
            variant={"solid"}
            bg={"brand.primary"}
            disabled={createCollection.isLoading}
          >
            Create
          </Button>
          <Button
            variant={"outline"}
            onClick={onClose}
            disabled={createCollection.isLoading}
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default AddNewCollectionForm;
