import React, { useState } from "react";
import {
  Button,
  Container,
  Group,
  Image,
  LoadingOverlay,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { BiPhotoAlbum } from "react-icons/bi";
import { createNewProduct } from "../../store/api/productService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TbFileUpload, TbPhoto, TbX } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import { selectCategories } from "../../store/slices/categorySlice";

const schema = z.object({
  title: z.string().min(3, { message: "Name should have at least 3 letters" }),
  price: z.number().positive(),
  category: z.string(),
  description: z.string(),
  brand: z.string(),
});

export type NewProductType = z.infer<typeof schema>;

const AddProductForm = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();

  const categories = useAppSelector(selectCategories).map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const form = useForm<NewProductType>({
    initialValues: {
      title: "",
      price: 0.0,
      category: "",
      description: "",
      brand: "",
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
  const navigate = useNavigate();

  const handleSubmit = async (values: NewProductType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const json = JSON.stringify(values);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("data", blob);

      files.forEach((file) => {
        formData.append("images", file);
      });

      await dispatch(createNewProduct(formData)).unwrap();
      setLoading(false);
      form.reset();
      setFiles([]);
      navigate("/admin/products/list");
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" px="xs">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        <Paper withBorder p="md" radius="md">
          <TextInput
            label="Product name"
            placeholder="Abc 12345 "
            {...form.getInputProps("title")}
            withAsterisk
          />
          <Group grow align="flex-start">
            <NumberInput
              placeholder="99.99"
              label="Price"
              precision={2}
              {...form.getInputProps("price")}
              withAsterisk
            />
            <Select
              style={{ zIndex: 2 }}
              data={categories}
              placeholder="Pick one"
              label="Category"
              {...form.getInputProps("category")}
            />
          </Group>
          <Textarea
            placeholder="Enter a detailed description of the product"
            label="Description"
            radius="xs"
            withAsterisk
            autosize
            minRows={2}
            maxRows={6}
            {...form.getInputProps("description")}
          />

          <Dropzone
            mt="md"
            accept={IMAGE_MIME_TYPE}
            multiple
            maxFiles={4}
            onDrop={(v) => {
              setFiles((prev) => {
                return [...prev, ...v];
              });
            }}
          >
            <Stack justify="center" align="center">
              <Dropzone.Accept>
                <TbFileUpload
                  size={50}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
                <BiPhotoAlbum size={48} />
                <Text align="center">Drop images here</Text>
              </Dropzone.Accept>
              <Dropzone.Reject>
                <TbX
                  size={50}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <TbPhoto size={50} />
              </Dropzone.Idle>
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
    </Container>
  );
};

export default AddProductForm;