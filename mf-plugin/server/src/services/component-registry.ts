import type { Core } from '@strapi/strapi';
import type { ParsedComponent, ComponentWithSource, MFSource } from '../types';

const PLUGIN_ID = 'plugin::mf-plugin';

const componentRegistryService = ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Get default components service
   */
  getDefaultComponentsService() {
    return strapi.plugin('mf-plugin').service('default-components');
  },

  /**
   * Get all components from all active MF sources (includes default components)
   */
  async getAllComponents(): Promise<ComponentWithSource[]> {
    const sources = (await strapi.documents(`${PLUGIN_ID}.mf-source`).findMany({
      filters: { isActive: true },
    })) as any[];

    // Start with default components
    const defaultComponentsService = this.getDefaultComponentsService();
    const allComponents: ComponentWithSource[] =
      defaultComponentsService.getDefaultComponentsWithSource();

    sources.forEach((source: any) => {
      const components = (source.components as ParsedComponent[]) || [];

      components.forEach((component) => {
        allComponents.push({
          ...component,
          sourceId: source.id,
          sourceDocumentId: source.documentId,
          sourceName: source.name,
          remoteEntry: source.remoteEntry,
          scope: source.scope,
        });
      });
    });

    return allComponents;
  },

  /**
   * Get components grouped by category
   */
  async getComponentsByCategory(): Promise<Record<string, ComponentWithSource[]>> {
    const components = await this.getAllComponents();

    return components.reduce(
      (acc, component) => {
        const category = component.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(component);
        return acc;
      },
      {} as Record<string, ComponentWithSource[]>
    );
  },

  /**
   * Get components grouped by MF source (includes default components as first group)
   */
  async getComponentsBySource(): Promise<
    Array<{
      sourceId: number;
      sourceDocumentId: string;
      sourceName: string;
      remoteEntry: string | null;
      scope: string | null;
      components: ParsedComponent[];
    }>
  > {
    const sources = (await strapi.documents(`${PLUGIN_ID}.mf-source`).findMany({
      filters: { isActive: true },
    })) as any[];

    // Start with default components as the first group
    const defaultComponentsService = this.getDefaultComponentsService();
    const result = [
      defaultComponentsService.getDefaultComponentsBySource(),
      ...sources.map((source: any) => ({
        sourceId: source.id,
        sourceDocumentId: source.documentId,
        sourceName: source.name,
        remoteEntry: source.remoteEntry,
        scope: source.scope,
        components: (source.components as ParsedComponent[]) || [],
      })),
    ];

    return result;
  },

  /**
   * Find a specific component by its ID
   */
  async findComponent(componentId: string): Promise<ComponentWithSource | null> {
    // Check default components first for performance
    const defaultComponentsService = this.getDefaultComponentsService();
    if (defaultComponentsService.isDefaultComponent(componentId)) {
      const defaultComponent = defaultComponentsService.findDefaultComponent(componentId);
      if (defaultComponent) {
        return {
          ...defaultComponent,
          sourceId: -1,
          sourceDocumentId: 'default-components',
          sourceName: 'Default Components',
          remoteEntry: null,
          scope: null,
        };
      }
    }

    const components = await this.getAllComponents();
    return components.find((c) => c.id === componentId) || null;
  },

  /**
   * Search components by name or description
   */
  async searchComponents(query: string): Promise<ComponentWithSource[]> {
    const components = await this.getAllComponents();
    const lowerQuery = query.toLowerCase();

    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.displayName.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery)
    );
  },
});

export default componentRegistryService;
