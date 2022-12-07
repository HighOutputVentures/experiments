<script lang="ts">
  import type { IProduct } from "common";
  import currencyFormatter from "../utils/currency-formatter";
  import numberFormatter from "../utils/number-formatter";
  import Button from "./button.svelte";

  interface Item {
    product: IProduct;
    quantity: number;
  }

  export let data: Item;
  export let onRemove: (data: IProduct) => void;
</script>

<div class="item">
  <div class="item--image">
    <img
      src={data.product.image.url}
      alt={data.product.name}
      width={data.product.image.width}
      height={data.product.image.height}
    />
  </div>

  <div class="item--info">
    <p class="item--name">{data.product.name}</p>
    <p class="item--price">{currencyFormatter.format(data.product.price)}</p>
    <p class="item--quantity">Quantity: {numberFormatter.format(data.quantity)}</p>
    <p class="item--total">Total: {currencyFormatter.format(data.product.price * data.quantity)}</p>

    <div class="item--action">
      <Button
        on:click={() => {
          onRemove(data.product);
        }}
      >
        Remove
      </Button>
    </div>
  </div>
</div>

<style>
  .item {
    display: flex;
    gap: 2rem;
  }

  .item--image {
    display: flex;
  }

  .item--name {
    font-size: 1.5rem;
  }

  .item--price {
    font-size: 1.2rem;
  }

  .item--quantity {
    margin-top: 1rem;
  }

  .item--action {
    margin-top: 2rem;
  }
</style>
