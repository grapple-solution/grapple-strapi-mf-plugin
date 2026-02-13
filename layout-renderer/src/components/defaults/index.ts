/**
 * Default component registry for built-in Strapi components
 * These components don't require Module Federation and are always available
 */

import DefaultImage from "./DefaultImage.svelte";
import DefaultRichText from "./DefaultRichText.svelte";
import DefaultHeading from "./DefaultHeading.svelte";
import DefaultButton from "./DefaultButton.svelte";
import DefaultSpacer from "./DefaultSpacer.svelte";
import DefaultDivider from "./DefaultDivider.svelte";
import DefaultCard from "./DefaultCard.svelte";
import DefaultVideo from "./DefaultVideo.svelte";
import DefaultIcon from "./DefaultIcon.svelte";
import DefaultContainer from "./DefaultContainer.svelte";

/**
 * Map of component names to their Svelte component constructors
 * Keys match the exposePath from the default components definition
 */
export const defaultComponentRegistry: Record<string, any> = {
  "./Image": DefaultImage,
  "./RichText": DefaultRichText,
  "./Heading": DefaultHeading,
  "./Button": DefaultButton,
  "./Spacer": DefaultSpacer,
  "./Divider": DefaultDivider,
  "./Card": DefaultCard,
  "./Video": DefaultVideo,
  "./Icon": DefaultIcon,
  "./Container": DefaultContainer,
};

/**
 * Check if a component ID is a default component
 */
export function isDefaultComponent(componentId: string): boolean {
  return componentId.startsWith("default-components/");
}

/**
 * Get the expose path from a default component ID
 * e.g., "default-components/Image" -> "./Image"
 */
export function getDefaultComponentExposePath(componentId: string): string {
  const name = componentId.replace("default-components/", "");
  return `./${name}`;
}

/**
 * Get a default component constructor by its component ID
 * Returns null if not a default component or not found
 */
export function getDefaultComponent(componentId: string): any | null {
  if (!isDefaultComponent(componentId)) {
    return null;
  }
  const exposePath = getDefaultComponentExposePath(componentId);
  return defaultComponentRegistry[exposePath] || null;
}

// Export all components individually for direct imports
export {
  DefaultImage,
  DefaultRichText,
  DefaultHeading,
  DefaultButton,
  DefaultSpacer,
  DefaultDivider,
  DefaultCard,
  DefaultVideo,
  DefaultIcon,
  DefaultContainer,
};
