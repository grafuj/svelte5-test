<script lang="ts">
  let { children } = $props();
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/films">Films</a>
  <a href="/users">Users</a>
  <a href="/reviews">Reviews</a>
  <a href="/settings">Settings</a>
</nav>

<main>
  <!-- <slot /> is deprecated -->
  {@render children()}
</main>

