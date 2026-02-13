<script lang="ts">
  export let height: string = '24px';
  export let backgroundColor: string = 'transparent';
</script>

<div 
  class="default-spacer"
  style="height: {height}; background-color: {backgroundColor}"
></div>

<style>
  .default-spacer {
    width: 100%;
  }
</style>
