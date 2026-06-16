# package-name

One-sentence description of what the package does.

[![npm](https://img.shields.io/npm/v/package-name.svg?colorB=brightgreen)](https://www.npmjs.com/package/package-name)
[![NPM Downloads](https://img.shields.io/npm/dm/package-name.svg?style=flat)](https://www.npmjs.com/package/package-name)

[Demo](https://codepen.io/ux-ui/pen/XXXXXXX)

---

<!--
README STANDARD (assembly.md §13)
- Markdown only, no HTML wrappers (<p align="center">, <div>, <br>).
- `---` divider between major sections.
- `#` — package name only; `##` — sections; `###` — subsections.
- Install via npm.
- Code examples follow the package's Biome style; every fence states its language.
- Drop sections that don't apply, keep the order of the rest.
-->

## Features

- Key capability one.
- Key capability two.
- Key capability three.

---

## Installation

```bash
npm install package-name
```

<!-- For packages that ship CSS, document the stylesheet import: -->

```ts
import 'package-name/package-name.css'
```

---

## Quick Start

```ts
import { createThing } from 'package-name'

const thing = createThing({
  enabled: true,
})

thing.start()
```

<!-- For DOM packages, include the required markup: -->

```html
<div class="package-name"></div>
```

---

## API

- `createThing(options)` — short description of what it returns and does.
- `thing.start()` — short description.
- `thing.stop()` — short description.
- `thing.isEnabled()` — short description.

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `false` | What this option controls. |
| `count` | `number` | `0` | What this option controls. |
| `onChange` | `(value) => void` | - | Callback fired on change. |

---

## Events

- `package-name:event` — dispatched when something happens. `event.detail` includes `{ value }`.

---

## Methods

```ts
thing.start()
thing.stop()
thing.isEnabled()
```

---

## Vue 3

<!-- Only for packages exposing a `./vue` subpath. Otherwise remove this section. -->

`package-name/vue` provides a Vue-scoped composable and a component wrapper. Vue is an optional
peer dependency, so the default `package-name` entry stays framework-agnostic.

```ts
import 'package-name/package-name.css'
```

### Composable

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useThing } from 'package-name/vue'

const elementRef = ref<HTMLElement | null>(null)
const { isActive, start, stop } = useThing(elementRef)
</script>
```

### Component

```vue
<script setup lang="ts">
import { ThingRoot } from 'package-name/vue'
</script>

<template>
  <ThingRoot v-model="isOpen" />
</template>
```

### Vue API

- `useThing(ref, options)` — creates a Vue-scoped controller and disposes it on unmount.
- `ThingRoot` — renders default markup and controls the core instance through `v-model`.

---

## Styling

<!-- Only for packages that ship CSS. Otherwise remove this section. -->

The default stylesheet is available as a package subpath:

```ts
import 'package-name/package-name.css'
```

```scss
@use "package-name/package-name.css" as *;
```

Default BEM classes:

- `.package-name`
- `.package-name__element`
- `.package-name--modifier`

Customizable CSS variables:

- `--package-name-color`
- `--package-name-z-index`

---

## Contributing

Build, packaging and release rules are shared across the portfolio — see
[`STANDARDS.md`](./STANDARDS.md). Don't duplicate them here.

---

## License

MIT
