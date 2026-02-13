import type { Core } from '@strapi/strapi';
import type { ParsedComponent, ComponentWithSource } from '../types';

/**
 * Default source identifier for built-in Strapi components
 * These components are always available and don't require Module Federation
 */
export const DEFAULT_SOURCE_ID = -1;
export const DEFAULT_SOURCE_DOCUMENT_ID = 'default-components';
export const DEFAULT_SOURCE_NAME = 'Default Components';

/**
 * Built-in component definitions that are always available in the builder
 */
export const DEFAULT_COMPONENTS: ParsedComponent[] = [
  {
    id: 'default-components/Image',
    name: 'Image',
    exposePath: './Image',
    displayName: 'Image',
    description: 'Display an image with optional alt text, caption, and responsive sizing',
    category: 'Media',
    icon: 'picture',
    props: {
      src: {
        type: 'string',
        required: true,
        description: 'The URL of the image to display',
      },
      alt: {
        type: 'string',
        required: false,
        default: '',
        description: 'Alternative text for accessibility',
      },
      caption: {
        type: 'string',
        required: false,
        description: 'Optional caption displayed below the image',
      },
      objectFit: {
        type: 'select',
        required: false,
        default: 'cover',
        options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
        description: 'How the image should fit within its container',
      },
      borderRadius: {
        type: 'string',
        required: false,
        default: '0',
        description: 'Border radius (e.g., "8px", "50%")',
      },
    },
  },
  {
    id: 'default-components/RichText',
    name: 'RichText',
    exposePath: './RichText',
    displayName: 'Rich Text',
    description: 'Display formatted text content with HTML support',
    category: 'Content',
    icon: 'file',
    props: {
      content: {
        type: 'richtext',
        required: true,
        default: '<p>Enter your content here...</p>',
        description: 'The HTML content to display',
      },
      textAlign: {
        type: 'select',
        required: false,
        default: 'left',
        options: ['left', 'center', 'right', 'justify'],
        description: 'Text alignment',
      },
    },
  },
  {
    id: 'default-components/Heading',
    name: 'Heading',
    exposePath: './Heading',
    displayName: 'Heading',
    description: 'Display a heading with customizable level and styling',
    category: 'Content',
    icon: 'bold',
    props: {
      text: {
        type: 'string',
        required: true,
        default: 'Heading',
        description: 'The heading text',
      },
      level: {
        type: 'select',
        required: false,
        default: 'h2',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        description: 'The heading level (h1-h6)',
      },
      textAlign: {
        type: 'select',
        required: false,
        default: 'left',
        options: ['left', 'center', 'right'],
        description: 'Text alignment',
      },
      color: {
        type: 'string',
        required: false,
        default: '#32324d',
        description: 'Text color (hex, rgb, or color name)',
      },
    },
  },
  {
    id: 'default-components/Button',
    name: 'Button',
    exposePath: './Button',
    displayName: 'Button',
    description: 'A clickable button with customizable styles and actions',
    category: 'Interactive',
    icon: 'cursor',
    props: {
      text: {
        type: 'string',
        required: true,
        default: 'Click Me',
        description: 'Button label text',
      },
      href: {
        type: 'string',
        required: false,
        description: 'URL to navigate to when clicked',
      },
      target: {
        type: 'select',
        required: false,
        default: '_self',
        options: ['_self', '_blank'],
        description: 'Where to open the link',
      },
      variant: {
        type: 'select',
        required: false,
        default: 'primary',
        options: ['primary', 'secondary', 'outline', 'ghost'],
        description: 'Button style variant',
      },
      size: {
        type: 'select',
        required: false,
        default: 'medium',
        options: ['small', 'medium', 'large'],
        description: 'Button size',
      },
      fullWidth: {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Whether the button should take full width',
      },
    },
  },
  {
    id: 'default-components/Spacer',
    name: 'Spacer',
    exposePath: './Spacer',
    displayName: 'Spacer',
    description: 'Add vertical or horizontal space between components',
    category: 'Layout',
    icon: 'arrowsAlt',
    props: {
      height: {
        type: 'string',
        required: false,
        default: '24px',
        description: 'Height of the spacer',
      },
      backgroundColor: {
        type: 'string',
        required: false,
        default: 'transparent',
        description: 'Background color (useful for dividers)',
      },
    },
  },
  {
    id: 'default-components/Divider',
    name: 'Divider',
    exposePath: './Divider',
    displayName: 'Divider',
    description: 'A horizontal line to separate content sections',
    category: 'Layout',
    icon: 'minus',
    props: {
      color: {
        type: 'string',
        required: false,
        default: '#dcdce4',
        description: 'Line color',
      },
      thickness: {
        type: 'string',
        required: false,
        default: '1px',
        description: 'Line thickness',
      },
      style: {
        type: 'select',
        required: false,
        default: 'solid',
        options: ['solid', 'dashed', 'dotted'],
        description: 'Line style',
      },
      margin: {
        type: 'string',
        required: false,
        default: '16px 0',
        description: 'Margin around the divider',
      },
    },
  },
  {
    id: 'default-components/Card',
    name: 'Card',
    exposePath: './Card',
    displayName: 'Card',
    description: 'A container with optional image, title, and content',
    category: 'Layout',
    icon: 'layer',
    props: {
      title: {
        type: 'string',
        required: false,
        description: 'Card title',
      },
      content: {
        type: 'text',
        required: false,
        description: 'Card body text',
      },
      imageUrl: {
        type: 'string',
        required: false,
        description: 'URL of the card image',
      },
      imagePosition: {
        type: 'select',
        required: false,
        default: 'top',
        options: ['top', 'bottom', 'left', 'right'],
        description: 'Position of the image relative to content',
      },
      linkUrl: {
        type: 'string',
        required: false,
        description: 'URL to navigate to when card is clicked',
      },
      shadow: {
        type: 'select',
        required: false,
        default: 'medium',
        options: ['none', 'small', 'medium', 'large'],
        description: 'Shadow depth',
      },
      padding: {
        type: 'string',
        required: false,
        default: '16px',
        description: 'Inner padding',
      },
    },
  },
  {
    id: 'default-components/Video',
    name: 'Video',
    exposePath: './Video',
    displayName: 'Video',
    description: 'Embed a video from YouTube, Vimeo, or direct URL',
    category: 'Media',
    icon: 'play',
    props: {
      src: {
        type: 'string',
        required: true,
        description: 'Video URL (YouTube, Vimeo, or direct video file)',
      },
      autoplay: {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Autoplay the video (muted)',
      },
      loop: {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Loop the video',
      },
      controls: {
        type: 'boolean',
        required: false,
        default: true,
        description: 'Show video controls',
      },
      aspectRatio: {
        type: 'select',
        required: false,
        default: '16/9',
        options: ['16/9', '4/3', '1/1', '9/16'],
        description: 'Video aspect ratio',
      },
    },
  },
  {
    id: 'default-components/Icon',
    name: 'Icon',
    exposePath: './Icon',
    displayName: 'Icon',
    description: 'Display an icon from the icon library',
    category: 'Media',
    icon: 'star',
    props: {
      name: {
        type: 'string',
        required: true,
        default: 'star',
        description: 'Icon name from the icon set',
      },
      size: {
        type: 'string',
        required: false,
        default: '24px',
        description: 'Icon size',
      },
      color: {
        type: 'string',
        required: false,
        default: '#32324d',
        description: 'Icon color',
      },
    },
  },
  {
    id: 'default-components/Container',
    name: 'Container',
    exposePath: './Container',
    displayName: 'Container',
    description: 'A flexible container for grouping and styling content',
    category: 'Layout',
    icon: 'dashboard',
    props: {
      backgroundColor: {
        type: 'string',
        required: false,
        default: 'transparent',
        description: 'Background color',
      },
      backgroundImage: {
        type: 'string',
        required: false,
        description: 'Background image URL',
      },
      padding: {
        type: 'string',
        required: false,
        default: '16px',
        description: 'Inner padding',
      },
      borderRadius: {
        type: 'string',
        required: false,
        default: '0',
        description: 'Border radius',
      },
      minHeight: {
        type: 'string',
        required: false,
        default: 'auto',
        description: 'Minimum height',
      },
      textContent: {
        type: 'richtext',
        required: false,
        description: 'Optional text content inside the container',
      },
    },
  },
];

/**
 * Service for providing default built-in components
 */
const defaultComponentsService = ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Get all default components
   */
  getDefaultComponents(): ParsedComponent[] {
    return DEFAULT_COMPONENTS;
  },

  /**
   * Get default components with source metadata (for component registry)
   */
  getDefaultComponentsWithSource(): ComponentWithSource[] {
    return DEFAULT_COMPONENTS.map((component) => ({
      ...component,
      sourceId: DEFAULT_SOURCE_ID,
      sourceDocumentId: DEFAULT_SOURCE_DOCUMENT_ID,
      sourceName: DEFAULT_SOURCE_NAME,
      remoteEntry: null,
      scope: null,
    }));
  },

  /**
   * Get default components grouped by source format
   */
  getDefaultComponentsBySource(): {
    sourceId: number;
    sourceDocumentId: string;
    sourceName: string;
    remoteEntry: string | null;
    scope: string | null;
    components: ParsedComponent[];
  } {
    return {
      sourceId: DEFAULT_SOURCE_ID,
      sourceDocumentId: DEFAULT_SOURCE_DOCUMENT_ID,
      sourceName: DEFAULT_SOURCE_NAME,
      remoteEntry: null,
      scope: null,
      components: DEFAULT_COMPONENTS,
    };
  },

  /**
   * Find a default component by ID
   */
  findDefaultComponent(componentId: string): ParsedComponent | null {
    return DEFAULT_COMPONENTS.find((c) => c.id === componentId) || null;
  },

  /**
   * Check if a component ID is a default component
   */
  isDefaultComponent(componentId: string): boolean {
    return componentId.startsWith('default-components/');
  },
});

export default defaultComponentsService;
