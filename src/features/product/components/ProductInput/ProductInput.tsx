import { ChangeEvent, useState } from "react";
import { useFetchProductsQuery } from "../../services/products";
import { ProductT } from "../../types/productObject";
import { ProductItem } from "../ProductItem/ProductItem";

import styles from "./styles.module.scss";
import { filterProducts } from "../../helpers/filterProducts";

export const ProductInput = () => {
  const [phrase, setPhrase] = useState("");
  const [results, setResults] = useState<ProductT[]>([]);
  const { data } = useFetchProductsQuery("");
  if (!data) return;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value);
    setResults(filterProducts(data.products, phrase));
  };

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
