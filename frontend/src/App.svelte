<script lang="ts">
  import { onMount } from "svelte";
  import { fetchFilms } from "./api/fetchFilms";
  import { fetchUsers } from "./api/fetchUsers";

  let films: { id: string; name: string }[] = [];
  let users: { id: string; username: string }[] = [];
  let error: string | null = null;

  onMount(async () => {
    try {
      films = await fetchFilms();
      users = await fetchUsers();
    } catch (err: any) {
      error = err.message;
    }
  });
</script>

<main>
  <h1>Svelte5 test: watchworth</h1>

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
    <h2>Users</h2>
    {#if users.length > 0}
      <ul>
        {#each users as user}
          <li><a href={`/users/${user.id}`}>{user.username}</a></li>
        {/each}
      </ul>
    {:else}
      <p>Loading users...</p>
    {/if}
  </div>
</main>
