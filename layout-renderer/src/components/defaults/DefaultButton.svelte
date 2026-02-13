<script lang="ts">
  export let text: string = 'Click Me';
  export let href: string = '';
  export let target: '_self' | '_blank' = '_self';
  export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let fullWidth: boolean = false;

  function handleClick() {
    if (href) {
      window.open(href, target);
    }
  }
</script>

<div class="default-button-wrapper" class:fullWidth>
  <button
    class="default-button {variant} {size}"
    class:fullWidth
    on:click={handleClick}
    type="button"
  >
    {text}
  </button>
</div>

<style>
  .default-button-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .default-button-wrapper.fullWidth {
    padding: 16px;
  }

  .default-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    white-space: nowrap;
  }

  .default-button.fullWidth {
    width: 100%;
  }

  /* Sizes */
  .default-button.small {
    padding: 8px 16px;
    font-size: 13px;
  }

  .default-button.medium {
    padding: 10px 20px;
    font-size: 14px;
  }

  .default-button.large {
    padding: 14px 28px;
    font-size: 16px;
  }

  /* Variants */
  .default-button.primary {
    background: #4945ff;
    color: #ffffff;
  }

  .default-button.primary:hover {
    background: #3b38cc;
  }

  .default-button.secondary {
    background: #f6f6f9;
    color: #32324d;
  }

  .default-button.secondary:hover {
    background: #dcdce4;
  }

  .default-button.outline {
    background: transparent;
    color: #4945ff;
    border: 2px solid #4945ff;
  }

  .default-button.outline:hover {
    background: #f0f0ff;
  }

  .default-button.ghost {
    background: transparent;
    color: #32324d;
  }

  .default-button.ghost:hover {
    background: #f6f6f9;
  }
</style>
