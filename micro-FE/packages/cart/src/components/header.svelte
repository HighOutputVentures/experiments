<header>
  <a
    href="/"
    on:click={(e) => {
      e.preventDefault();
      window.history.pushState({ pathname: "/" }, "", "/");
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
      />
    </svg>

    Go back
  </a>
</header>

<style>
  header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e4e4e7;
  }

  a {
    color: #404040;
    outline: none;
    transition: color 300ms ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a:hover,
  a:focus {
    color: #0369a1;
  }

  svg {
    width: 20px;
    height: 20px;
  }
</style>
