<script lang="ts">
  export let content: string = '<p>Enter your content here...</p>';
  export let textAlign: 'left' | 'center' | 'right' | 'justify' = 'left';
</script>

<div 
  class="default-richtext"
  style="text-align: {textAlign}"
>
  {@html content}
</div>

<style>
  .default-richtext {
    width: 100%;
    height: 100%;
    padding: 16px;
    font-size: 15px;
    line-height: 1.6;
    color: #32324d;
    overflow: auto;
  }

  .default-richtext :global(h1),
  .default-richtext :global(h2),
  .default-richtext :global(h3),
  .default-richtext :global(h4),
  .default-richtext :global(h5),
  .default-richtext :global(h6) {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: 600;
    color: #32324d;
  }

  .default-richtext :global(p) {
    margin: 0 0 1em 0;
  }

  .default-richtext :global(p:last-child) {
    margin-bottom: 0;
  }

  .default-richtext :global(a) {
    color: #4945ff;
    text-decoration: none;
  }

  .default-richtext :global(a:hover) {
    text-decoration: underline;
  }

  .default-richtext :global(ul),
  .default-richtext :global(ol) {
    margin: 0 0 1em 0;
    padding-left: 1.5em;
  }

  .default-richtext :global(blockquote) {
    margin: 0 0 1em 0;
    padding: 12px 20px;
    border-left: 4px solid #4945ff;
    background: #f6f6f9;
    font-style: italic;
  }

  .default-richtext :global(code) {
    background: #f6f6f9;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }

  .default-richtext :global(pre) {
    background: #32324d;
    color: #fff;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 0 0 1em 0;
  }

  .default-richtext :global(pre code) {
    background: none;
    padding: 0;
    color: inherit;
  }

  .default-richtext :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
</style>
