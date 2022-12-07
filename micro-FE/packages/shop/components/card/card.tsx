import { IProduct, useAuthContext, useCartContext } from "common";
import Image from "next/image";
import styles from "./card.module.css";

export default function Card({ data }: { data: IProduct }) {
  const cart = useCartContext();
  const auth = useAuthContext();

  return (
    <div className={styles["card"]}>
      <div className={styles["card--body"]}>
        <div className={styles["card--image"]}>
          <Image
            src={data.image.url}
            alt={data.name}
            width={data.image.width}
            height={data.image.height}
          />
        </div>

        {auth.isAuthorized && (
          <button
            className={styles["card--action"]}
            onClick={() => {
              cart.add(data, 1);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>

      <div className={styles["card--foot"]}>
        <div className={styles["card--info"]}>
          <p>{data.name}</p>
          <p>{formatter.format(data.price)}</p>
        </div>
      </div>
    </div>
  );
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
