<script lang="ts">
  export let color: string = '#dcdce4';
  export let thickness: string = '1px';
  export let style: 'solid' | 'dashed' | 'dotted' = 'solid';
  export let margin: string = '16px 0';
</script>

<div class="default-divider-wrapper" style="padding: {margin}">
  <hr 
    class="default-divider"
    style="border-color: {color}; border-width: {thickness}; border-style: {style}"
  />
</div>

<style>
  .default-divider-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .default-divider {
    width: 100%;
    border: none;
    border-top-width: 1px;
    margin: 0;
  }
</style>
