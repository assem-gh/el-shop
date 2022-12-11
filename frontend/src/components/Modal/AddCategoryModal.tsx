import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { addCategory } from "../../store/api/productService";
import { useAppDispatch } from "../../store/hooks";
import BaseModal from "./BaseModal";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { CreateCategoryRequest } from "../../store/api/types";
import { Button, Group, Stack, TextInput } from "@mantine/core";

const schema = z.object({
  name: z.string().min(3, { message: "Name should have at least 3 letters" }),
});

interface AddCategoryModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const AddCategoryModal = ({
  openModal,
  setOpenModal,
}: AddCategoryModalProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  const handleSubmit = async (values: CreateCategoryRequest) => {
    setLoading(true);
    try {
      await dispatch(addCategory(values)).unwrap();
      setOpenModal(false);
      setLoading(false);
      form.reset();
    } catch (err) {
      setLoading(false);
    }
  };

  const handleCancel = useCallback(() => setOpenModal(false), [setOpenModal]);

  return (
    <BaseModal
      title="Add new Category:"
      withCloseBtn
      openModal={openModal}
      setOpenModal={setOpenModal}
      loading={loading}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack justify="center" align="stretch" my="md">
          <TextInput
            withAsterisk
            placeholder="Enter new name"
            {...form.getInputProps("name")}
          />
        </Stack>
        <Group position="right">
          <Button variant="outline" color="gray" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="filled" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </BaseModal>
  );
};

export default AddCategoryModal;
