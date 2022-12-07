<script lang="ts">
  type $$Props = Omit<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["button"]>, "size"> & {
    size?: "md" | "lg";
  };

  export let size = "md";

  const md = size === "md";
  const lg = size === "lg";
</script>

<button class="btn" class:md class:lg on:click {...$$restProps}>
  <slot />
</button>

<style>
  .btn {
    display: block;
    background-color: transparent;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    transition: border-color 300ms ease-in-out;
    color: #27272a;
    outline: none;
  }

  .btn:hover,
  .btn:focus {
    border: 1px solid #d4d4d8;
  }

  .btn.md {
    padding: 0.4rem 0.8rem;
    font-size: 16px;
  }

  .btn.lg {
    padding: 0.5rem 1rem;
    font-size: 18px;
  }
</style>
