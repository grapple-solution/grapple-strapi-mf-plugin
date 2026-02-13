<script lang="ts">
  export let src: string = '';
  export let autoplay: boolean = false;
  export let loop: boolean = false;
  export let controls: boolean = true;
  export let aspectRatio: '16/9' | '4/3' | '1/1' | '9/16' = '16/9';

  // Detect video type
  $: videoType = (() => {
    if (!src) return 'none';
    if (src.includes('youtube.com') || src.includes('youtu.be')) return 'youtube';
    if (src.includes('vimeo.com')) return 'vimeo';
    return 'direct';
  })();

  // Extract YouTube video ID
  $: youtubeId = (() => {
    if (videoType !== 'youtube') return '';
    const match = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/);
    return match ? match[1] : '';
  })();

  // Extract Vimeo video ID
  $: vimeoId = (() => {
    if (videoType !== 'vimeo') return '';
    const match = src.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : '';
  })();

  // Build embed URL
  $: embedUrl = (() => {
    if (videoType === 'youtube' && youtubeId) {
      const params = new URLSearchParams();
      if (autoplay) params.set('autoplay', '1');
      if (autoplay) params.set('mute', '1');
      if (loop) params.set('loop', '1');
      if (!controls) params.set('controls', '0');
      return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
    }
    if (videoType === 'vimeo' && vimeoId) {
      const params = new URLSearchParams();
      if (autoplay) params.set('autoplay', '1');
      if (autoplay) params.set('muted', '1');
      if (loop) params.set('loop', '1');
      return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
    }
    return '';
  })();
</script>

<div class="default-video" style="aspect-ratio: {aspectRatio}">
  {#if videoType === 'none'}
    <div class="placeholder">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      <span>No video source</span>
    </div>
  {:else if videoType === 'youtube' || videoType === 'vimeo'}
    <iframe
      src={embedUrl}
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  {:else}
    <video
      {src}
      {controls}
      {loop}
      autoplay={autoplay}
      muted={autoplay}
      playsinline
    >
      <track kind="captions" />
      Your browser does not support the video tag.
    </video>
  {/if}
</div>

<style>
  .default-video {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  iframe,
  video {
    width: 100%;
    height: 100%;
    border: none;
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #666;
    padding: 20px;
    text-align: center;
  }

  .placeholder span {
    font-size: 13px;
  }
</style>
