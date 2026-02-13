<script lang="ts">
  export let text: string = 'Heading';
  export let level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
  export let textAlign: 'left' | 'center' | 'right' = 'left';
  export let color: string = '#32324d';
</script>

<div class="default-heading" style="text-align: {textAlign}">
  {#if level === 'h1'}
    <h1 style="color: {color}">{text}</h1>
  {:else if level === 'h2'}
    <h2 style="color: {color}">{text}</h2>
  {:else if level === 'h3'}
    <h3 style="color: {color}">{text}</h3>
  {:else if level === 'h4'}
    <h4 style="color: {color}">{text}</h4>
  {:else if level === 'h5'}
    <h5 style="color: {color}">{text}</h5>
  {:else}
    <h6 style="color: {color}">{text}</h6>
  {/if}
</div>

<style>
  .default-heading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    width: 100%;
    font-weight: 600;
    line-height: 1.2;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }
</style>
