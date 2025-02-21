<script lang="ts">
  import '@picocss/pico'
  let { children } = $props();
</script>

<nav class="container">
  <a href="/">Home</a>
  <button>Home</button>
  <a href="/about">About</a>
  <a href="/films">Films</a>
  <a href="/users">Users</a>
  <a href="/reviews">Reviews</a>
  <a href="/settings">Settings</a>
  <p>night icon lol</p>
</nav>

<main class="container">
  <!-- <slot /> is deprecated -->
  {@render children()}
</main>

