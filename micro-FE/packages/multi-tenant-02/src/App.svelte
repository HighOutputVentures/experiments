<script lang="ts">
  import type { IProduct } from "common";

  export let data: IProduct | undefined = undefined;
</script>

<pre class="snippet"><code>{JSON.stringify(data, null, 4)}</code></pre>

<style>
  .snippet {
    font-family: "Fira Code", monospace;
    font-size: 16px;
    background-color: #f4f4f5;
    padding: 2rem;
    margin: 2rem;
    border-radius: 0.5rem;
    color: #3f3f46;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
