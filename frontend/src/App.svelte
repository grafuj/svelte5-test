<script lang="ts">
  import { onMount } from "svelte";
  import { fetchFilms } from "./api";

  let films: { id: string; name: string }[] = [];
  let error: string | null = null;

  onMount(async () => {
    try {
      films = await fetchFilms();
    } catch (err: any) {
      error = err.message;
    }
  });
</script>

<main>
  <h1>Vite + Svelte</h1>

  {#if error}
    <p style="color: red;">Error: {error}</p>
  {/if}

  <div>
    <h2>Films</h2>
    {#if films.length > 0}
      <ul>
        {#each films as film}
          <li><a href={`/films/${film.id}`}>{film.name}</a></li>
        {/each}
      </ul>
    {:else}
      <p>Loading films...</p>
    {/if}
  </div>
</main>
