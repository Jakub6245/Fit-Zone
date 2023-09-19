import { Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useFetchProductsQuery } from "../services/products";
import { ProductObjectT, ProductT } from "../types/productObject";
import { ProductItem } from "./ProductItem";
import { Text } from "@chakra-ui/react";

const filterProducts = (data: ProductT[], phrase: string) => {
  if (phrase.length <= 2) return [];
  return data.filter((el) =>
    el.name.toLowerCase().includes(phrase.toLowerCase())
  );
};

export const ProductInput = () => {
  const [phrase, setPhrase] = useState("");
  const [results, setResults] = useState<ProductT[]>([]);
  const { data, isFetching } = useFetchProductsQuery("");
  if (isFetching) return <div>...Loading</div>;
  if (!data) return;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value);
    setResults(filterProducts(data.products, phrase));
  };

  console.log(data.products);
  return (
    <div>
      <form>
        <Input width="25%" value={phrase} onChange={handleChange} />
      </form>

      {results.map((el, i) => (
        <ProductItem key={i} productData={el} />
      ))}
      {results.length === 0 && phrase.length >= 2 && <Text>No results</Text>}
    </div>
  );
};
