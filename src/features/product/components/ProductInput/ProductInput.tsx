import { Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useFetchProductsQuery } from "../../services/products";
import { ProductT } from "../../types/productObject";
import { ProductItem } from "../ProductItem/ProductItem";
import { Text } from "@chakra-ui/react";
import styles from "./styles.module.scss";

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
      <form className={styles.product__form}>
        <input
          placeholder="Search for product"
          className={styles.product__input}
          value={phrase}
          onChange={handleChange}
        />
      </form>

      {results.map((el, i) => (
        <ProductItem key={i} productData={el} />
      ))}
      {results.length === 0 && phrase.length >= 2 && (
        <h1 className={styles.product__text}>No results</h1>
      )}
    </div>
  );
};
