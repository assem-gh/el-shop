import React, { useState } from "react";
import {
  Button,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { BiPhotoAlbum } from "react-icons/bi";
import productsAPI from "../../store/api/productService";
import { useAppDispatch } from "../../store/hooks";

const schema = z.object({
  title: z.string().min(3, { message: "Name should have at least 3 letters" }),
  price: z.number().positive(),
  category: z.enum(["Mobile", "Notebook"]),
});

export type NewProductType = z.infer<typeof schema>;

const AddProductForm = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const form = useForm<NewProductType>({
    initialValues: {
      title: "",
      price: 0.0,
      category: "Mobile",
    },
    validate: zodResolver(schema),
    validateInputOnChange: ["name", "price"],
  });

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (values: NewProductType) => {
    const data = { ...values, images: [] };
    dispatch(productsAPI.createNewProduct(data));
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Paper withBorder p="md" radius="md">
        <TextInput
          label="Product name"
          placeholder="Abc 12345 "
          {...form.getInputProps("title")}
        />
        <Group grow>
          <NumberInput
            placeholder="99.99"
            label="Price"
            precision={2}
            {...form.getInputProps("price")}
          />
          <Select
            style={{ zIndex: 2 }}
            data={["Mobile", "Notebook"]}
            placeholder="Pick one"
            label="Category"
            {...form.getInputProps("category")}
          />
        </Group>

        <Dropzone
          mt="md"
          accept={IMAGE_MIME_TYPE}
          onDrop={(v) => setFiles((prev) => [...prev, ...v])}
        >
          <Stack justify="center" align="center">
            <BiPhotoAlbum size={48} />
            <Text align="center">Drop images here</Text>
          </Stack>
        </Dropzone>

        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          mt={previews.length > 0 ? "xl" : 0}
        >
          {previews}
        </SimpleGrid>

        <Button type="submit" my="md" fullWidth>
          Submit
        </Button>
      </Paper>
    </form>
  );
};

export default AddProductForm;