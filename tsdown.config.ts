import { defineLibrary } from '@nilmuse/tsdown-config';

// Standard TS library (§5.1). Pass overrides as needed, e.g.:
//   export default defineLibrary({ platform: 'browser' });
// For a Web Component + CSS sidecar (§5.3) use defineCssLibrary instead:
//   import { defineCssLibrary } from '@nilmuse/tsdown-config';
//   export default defineCssLibrary({ cssFileName: 'package-name.css' });
export default defineLibrary();
