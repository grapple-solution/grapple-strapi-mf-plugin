<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { loadFederatedComponent } from '../mf-loader';
  import { getDefaultComponent, isDefaultComponent } from './defaults';
  import type { ComponentRenderInfo } from '../types';

  export let componentInfo: ComponentRenderInfo;

  let containerElement: HTMLDivElement;
  let componentInstance: any = null;
  let loading = true;
  let error: string | null = null;

  // Check if this is a default component
  $: isDefault = componentInfo.isDefault || isDefaultComponent(componentInfo.item.componentId);

  async function loadComponent(): Promise<any> {
    // For default components, get from the local registry
    if (isDefault) {
      const Component = getDefaultComponent(componentInfo.item.componentId);
      if (!Component) {
        throw new Error(`Default component not found: ${componentInfo.item.componentId}`);
      }
      return Component;
    }

    // For MF components, load from remote
    if (!componentInfo.scope || !componentInfo.remoteEntry) {
      throw new Error(`Missing scope or remoteEntry for component: ${componentInfo.displayName}`);
    }

    return await loadFederatedComponent(
      componentInfo.scope,
      componentInfo.exposePath,
      componentInfo.remoteEntry
    );
  }

  onMount(async () => {
    try {
      console.log('[ComponentRenderer] Loading:', componentInfo.displayName, {
        isDefault,
        componentId: componentInfo.item.componentId,
        scope: componentInfo.scope,
        exposePath: componentInfo.exposePath,
      });

      const Component = await loadComponent();

      if (!containerElement) {
        return; // Component unmounted during load
      }

      // Mount the Svelte component
      if (typeof Component === 'function') {
        componentInstance = new Component({
          target: containerElement,
          props: componentInfo.item.props || {},
        });
        console.log('[ComponentRenderer] Mounted:', componentInfo.displayName);
      } else {
        throw new Error('Loaded module is not a component constructor');
      }

      loading = false;
    } catch (err) {
      console.error('[ComponentRenderer] Failed to load:', componentInfo.displayName, err);
      error = err instanceof Error ? err.message : 'Failed to load component';
      loading = false;
    }
  });

  onDestroy(() => {
    if (componentInstance && componentInstance.$destroy) {
      try {
        componentInstance.$destroy();
        componentInstance = null;
      } catch (e) {
        console.warn('[ComponentRenderer] Error destroying component:', e);
      }
    }
  });
</script>

<div class="component-renderer" style="width: 100%; height: 100%; position: relative;">
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading {componentInfo.displayName}...</p>
    </div>
  {:else if error}
    <div class="error">
      <strong>Failed: {componentInfo.displayName}</strong>
      <small>{error}</small>
    </div>
  {/if}
  
  <div 
    bind:this={containerElement} 
    class="component-container"
    class:hidden={loading || error}
  ></div>
</div>

<style>
  .component-renderer {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #666;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #4945ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 8px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading p {
    font-size: 12px;
    margin: 0;
  }

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 16px;
    color: #d02b20;
    text-align: center;
  }

  .error strong {
    display: block;
    margin-bottom: 4px;
  }

  .error small {
    opacity: 0.8;
    word-break: break-word;
  }

  .component-container {
    width: 100%;
    height: 100%;
  }

  .component-container.hidden {
    display: none;
  }
</style>
