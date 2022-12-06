<script lang="ts">
  import { onDestroy } from "svelte";
  import Badge from "./components/badge.svelte";
  import Button from "./components/button.svelte";
  import Card from "./components/card.svelte";
  import Header from "./components/header.svelte";
  import Spacer from "./components/spacer.svelte";
  import cartStore from "./stores/cart";

  const { items, clear, remove, subscribe } = cartStore();

  const unsubscribe = subscribe();

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>Cart</title>
</svelte:head>

<Header />

<main class="main">
  <div class="header">
    <div class="header--heading">
      <h1>Cart</h1>

      <Badge>{$items.reduce((n, { quantity }) => n + quantity, 0)}</Badge>
    </div>

    <Spacer />
    <Button size="lg" on:click={clear}>Clear cart</Button>
  </div>

  <div class="items-container">
    {#each $items as item, index}
      <Card data={item} onRemove={remove} />

      {#if index + 1 < $items.length}
        <div class="divider" />
      {/if}
    {/each}
  </div>
</main>

<style>
  :global(*, *::after, *::before) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: white;
    color: #171717;
    scroll-behavior: smooth;
  }

  :global(input, select, textarea, button) {
    font: inherit;
    color: inherit;
  }

  :global(button) {
    cursor: pointer;
  }

  :global(a) {
    text-decoration: none;
  }

  :global(ol, ul) {
    list-style: none;
  }

  .main {
    padding: 4rem;
    max-width: 900px;
    margin: auto;
  }

  .header {
    display: flex;
    align-items: center;
  }

  .header--heading {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .header--heading h1 {
    font-size: 2rem;
    color: #262626;
  }

  .items-container {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .divider {
    border-bottom: 1px solid #e5e5e5;
  }
</style>
