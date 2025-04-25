<script lang="ts">
  import "@picocss/pico";
  let { children } = $props();


</script>

<nav class="container">
    <a href="/">
      <button> Home </button>
    </a>
    <a href="/about">
      <button>About</button>
    </a>
    <a href="/films">
      <button>Films</button>
    </a>
    <a href="/users">
      <button>Users</button>
    </a>
    <a href="/reviews">
      <button>Reviews</button>
    </a>
    <a href="/settings">
      <button>Settings</button>
    </a>
    <span>
      <input type="checkbox" role="switch" id="terms" name="terms" />
    </span>
 
</nav>

<main class="container">
  <!-- <slot /> is deprecated -->
  {@render children()}
</main>
