/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, useEffect, useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../api/firebase/firebase-config";
import { addProduct } from "../../api/firebase/firestore/products";
import { getCategories } from "../../api/firebase/firestore/categories";
import { TCategory } from "../../@types/categories";
import { TProduct } from "../../@types/product";
import Button from "../../components/Button";
import Container from "../../components/Container";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import Spinner from "../../components/Spinner";
import Select from "../../components/Select";
import * as Styled from "./styles";

type AddProductValues = Omit<
  TProduct,
  "images" | "uid" | "rating" | "sales" | "createdAt"
> & {
  images: FileList | null;
};

const defaultValues: DefaultValues<AddProductValues> = {
  title: "",
  description: "",
  price: 0,
  stock: 0,
  dimensions: {
    depth: "",
    height: "",
    width: "",
  },
  category: "",
  images: null,
};

const Admin = () => {
  const { register, reset, control, handleSubmit } = useForm<AddProductValues>({
    defaultValues,
  });

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<AddProductValues> = async (data) => {
    const uid = nanoid(21);
    setLoading(true);
    try {
      if (!data.images) return;
      const uploadURLS = await Promise.all(
        Array.from(data.images).map((image, index) =>
          uploadBytes(ref(storage, `products/${uid}-${index + 1}`), image)
        )
      );
      const downloadURLS = await Promise.all(
        uploadURLS.map((url) => getDownloadURL(url.ref))
      );
      await addProduct(firestore, {
        uid,
        ...data,
        images: downloadURLS,
      });
    } catch (error) {
      console.log(error);
    }
    reset(defaultValues);
    setLoading(false);
  };

  useEffect(() => {
    getCategories(firestore)
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Container>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Heading>Adicionar Produto</Styled.Heading>
          <TextInput
            {...register("title")}
            type="text"
            id="title"
            name="title"
            placeholder="Título do produto"
            label="Título"
            size="small"
          />

          <Select
            {...register("category")}
            defaultValue=""
            name="category"
            id="category"
            label="Categoria"
          >
            <option value="" disabled>
              Escolher
            </option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
          <TextArea
            {...register("description")}
            id="description"
            name="description"
            label="Descrição"
            size="small"
            minRows={4}
          />
          <Styled.Grid style={{ display: "flex" }}>
            <TextInput
              {...register("dimensions.height")}
              type="text"
              id="height"
              name="height"
              label="Altura"
              size="small"
            />
            <TextInput
              {...register("dimensions.width")}
              type="text"
              id="width"
              name="width"
              label="Largura"
              size="small"
            />
            <TextInput
              {...register("dimensions.depth")}
              type="text"
              id="depth"
              name="depth"
              label="Comprimento"
              size="small"
            />
          </Styled.Grid>
          <Styled.Grid>
            <TextInput
              {...register("price")}
              type="number"
              id="price"
              name="price"
              label="Preço"
              size="small"
            />
            <TextInput
              {...register("stock")}
              type="number"
              id="stock"
              name="stock"
              label="Em estoque"
              size="small"
            />
          </Styled.Grid>
          <Styled.Grid>
            <Styled.Label htmlFor="images">Imagens</Styled.Label>
            <input
              type="file"
              {...register("images", {
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                  event.target.files,
              })}
              id="images"
              name="images"
              multiple
            />
          </Styled.Grid>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Confirmar"}
          </Button>
        </Styled.Form>
      </Container>
      <DevTool control={control} />
    </>
  );
};

export default Admin;
