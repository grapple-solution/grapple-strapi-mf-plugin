<script lang="ts">
  export let src: string = '';
  export let alt: string = '';
  export let caption: string = '';
  export let objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' = 'cover';
  export let borderRadius: string = '0';
</script>

<figure class="default-image" style="--border-radius: {borderRadius}">
  {#if src}
    <img 
      {src} 
      {alt}
      style="object-fit: {objectFit}"
      loading="lazy"
    />
    {#if caption}
      <figcaption>{caption}</figcaption>
    {/if}
  {:else}
    <div class="placeholder">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="m21 15-5-5L5 21"/>
      </svg>
      <span>No image source</span>
    </div>
  {/if}
</figure>

<style>
  .default-image {
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--border-radius, 0);
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--border-radius, 0);
  }

  figcaption {
    padding: 8px 12px;
    font-size: 13px;
    color: #666687;
    text-align: center;
    background: #f6f6f9;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #f6f6f9;
    color: #8e8ea9;
    border-radius: var(--border-radius, 0);
  }

  .placeholder span {
    font-size: 13px;
  }
</style>
