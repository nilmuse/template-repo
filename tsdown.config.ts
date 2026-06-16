import { defineLibrary } from '@ux-ui/tsdown-config';

// Standard TS library (§5.1). Pass overrides as needed, e.g.:
//   export default defineLibrary({ platform: 'browser' });
// For a Web Component + CSS sidecar (§5.3) use defineCssLibrary instead:
//   import { defineCssLibrary } from '@ux-ui/tsdown-config';
//   export default defineCssLibrary({ cssFileName: 'package-name.css' });
export default defineLibrary();
