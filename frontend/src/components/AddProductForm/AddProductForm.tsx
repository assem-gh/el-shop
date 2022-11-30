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
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { BiPhotoAlbum } from "react-icons/bi";
import productService from "../../store/api/productService";
import { useAppDispatch } from "../../store/hooks";
import { TbFileUpload, TbPhoto, TbX } from "react-icons/all";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(3, { message: "Name should have at least 3 letters" }),
  price: z.number().positive(),
  category: z.enum(["Mobile", "Notebook"]),
});

export type NewProductType = z.infer<typeof schema>;

const AddProductForm = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const theme = useMantineTheme();
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
  const navigate = useNavigate();

  const handleSubmit = async (values: NewProductType) => {
    const formData = new FormData();

    const json = JSON.stringify(values);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("data", blob);

    files.forEach((file) => {
      formData.append("images", file);
    });

    dispatch(productService.createNewProduct(formData));
    navigate("/admin/products/list");
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
  );
};

export default AddProductForm;