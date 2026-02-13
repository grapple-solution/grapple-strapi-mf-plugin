<script lang="ts">
  export let backgroundColor: string = 'transparent';
  export let backgroundImage: string = '';
  export let padding: string = '16px';
  export let borderRadius: string = '0';
  export let minHeight: string = 'auto';
  export let textContent: string = '';

  $: backgroundStyle = backgroundImage 
    ? `background-image: url(${backgroundImage}); background-size: cover; background-position: center;`
    : '';
</script>

<div 
  class="default-container"
  style="
    background-color: {backgroundColor};
    {backgroundStyle}
    padding: {padding};
    border-radius: {borderRadius};
    min-height: {minHeight};
  "
>
  {#if textContent}
    <div class="container-content">
      {@html textContent}
    </div>
  {:else}
    <slot />
  {/if}
</div>

<style>
  .default-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .container-content {
    font-size: 15px;
    line-height: 1.6;
    color: #32324d;
  }

  .container-content :global(h1),
  .container-content :global(h2),
  .container-content :global(h3),
  .container-content :global(h4),
  .container-content :global(h5),
  .container-content :global(h6) {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: 600;
  }

  .container-content :global(p) {
    margin: 0 0 1em 0;
  }

  .container-content :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
