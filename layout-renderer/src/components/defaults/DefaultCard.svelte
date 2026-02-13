<script lang="ts">
  export let title: string = '';
  export let content: string = '';
  export let imageUrl: string = '';
  export let imagePosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let linkUrl: string = '';
  export let shadow: 'none' | 'small' | 'medium' | 'large' = 'medium';
  export let padding: string = '16px';

  const shadowStyles = {
    none: 'none',
    small: '0 1px 3px rgba(0, 0, 0, 0.08)',
    medium: '0 2px 8px rgba(0, 0, 0, 0.12)',
    large: '0 4px 16px rgba(0, 0, 0, 0.16)',
  };

  $: isHorizontal = imagePosition === 'left' || imagePosition === 'right';
  $: isReversed = imagePosition === 'bottom' || imagePosition === 'right';
</script>

{#if linkUrl}
  <a 
    href={linkUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="default-card clickable"
    class:horizontal={isHorizontal}
    class:reversed={isReversed}
    style="box-shadow: {shadowStyles[shadow]}; --padding: {padding}"
  >
    {#if imageUrl}
      <div class="card-image">
        <img src={imageUrl} alt={title || 'Card image'} />
      </div>
    {/if}
    
    <div class="card-content">
      {#if title}
        <h3 class="card-title">{title}</h3>
      {/if}
      {#if content}
        <p class="card-text">{content}</p>
      {/if}
      {#if !title && !content}
        <p class="card-placeholder">Card content goes here</p>
      {/if}
    </div>
  </a>
{:else}
  <article 
    class="default-card"
    class:horizontal={isHorizontal}
    class:reversed={isReversed}
    style="box-shadow: {shadowStyles[shadow]}; --padding: {padding}"
  >
    {#if imageUrl}
      <div class="card-image">
        <img src={imageUrl} alt={title || 'Card image'} />
      </div>
    {/if}
    
    <div class="card-content">
      {#if title}
        <h3 class="card-title">{title}</h3>
      {/if}
      {#if content}
        <p class="card-text">{content}</p>
      {/if}
      {#if !title && !content}
        <p class="card-placeholder">Card content goes here</p>
      {/if}
    </div>
  </article>
{/if}

<style>
  .default-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
  }

  .default-card.horizontal {
    flex-direction: row;
  }

  .default-card.reversed {
    flex-direction: column-reverse;
  }

  .default-card.horizontal.reversed {
    flex-direction: row-reverse;
  }

  .default-card.clickable {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .default-card.clickable:hover {
    transform: translateY(-2px);
  }

  .card-image {
    flex-shrink: 0;
  }

  .default-card:not(.horizontal) .card-image {
    height: 160px;
    width: 100%;
  }

  .default-card.horizontal .card-image {
    width: 40%;
    min-height: 100%;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-content {
    flex: 1;
    padding: var(--padding, 16px);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #32324d;
    line-height: 1.3;
  }

  .card-text {
    margin: 0;
    font-size: 14px;
    color: #666687;
    line-height: 1.5;
  }

  .card-placeholder {
    margin: 0;
    font-size: 14px;
    color: #8e8ea9;
    font-style: italic;
  }
</style>
