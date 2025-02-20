<script lang="ts">
  import { onMount } from "svelte";
  import { fetchUsers } from "../../api/fetchUsers";

  let users: { id: string; username: string }[] = [];
  let error: string | null = null;

  onMount(async () => {
    try {
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
    <h2>Users</h2>
    {#if users.length > 0}
      <ul>
        {#each users as user}
          <li><a href={`/users/${user.username}`}>{user.username}</a></li>
        {/each}
      </ul>
    {:else}
      <p>Loading users...</p>
    {/if}
  </div>
</main>



