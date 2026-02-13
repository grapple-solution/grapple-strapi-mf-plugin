import service from './service';
import manifest from './manifest';
import layout from './layout';
import componentRegistry from './component-registry';
import defaultComponents from './default-components';

const services: Record<string, unknown> = {
  service,
  manifest,
  layout,
  'component-registry': componentRegistry,
  'default-components': defaultComponents,
};

export default services;
