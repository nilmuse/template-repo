# STANDARDS — портфель npm-пакетов ux-ui-pro

Единый документ правил разработки и обслуживания пакетов портфеля. Это текстовая точка истины
(`assembly.md` §7.1): он **ссылается** на утверждённый стандарт `assembly.md` и на shared-конфиги,
а не дублирует их. Полная аргументация решений — в `assembly.md` (ссылки на § ниже).

Этот репозиторий (`_template-repo`) — эталон структуры пакета (вариант §5.1) и место, на которое
ссылаются README отдельных пакетов в секции Contributing.

---

## 1. Обзор портфеля

27 активных пакетов (`assembly.md` §1, реестр — `inventory.txt`), пять типов (`assembly.md` §5):

- §5.1 — стандартная TS-библиотека (17 шт; этот шаблон);
- §5.2 — multi-entry / internal API (`plinkit`);
- §5.3 — Web Component + CSS sidecar, с/без Vue-обёртки (5 шт);
- §5.4 — CSS-only (`typographics`, `gridline`);
- §5.5 — Vite-plugin (2 шт).

Shared-инструментарий (не входит в 27, каталоги с префиксом `_`): `@ux-ui/tsconfig-base`,
`@ux-ui/biome-config`, `@ux-ui/tsdown-config`, `@ux-ui/vitest-runner`.

---

## 2. Стратегические решения

Кратко (полностью — `assembly.md` §2):

- **Polyrepo** + усиленная стандартизация: один пакет = один git-репозиторий.
- **npm без Corepack**: `packageManager: npm@…` — декларация; версию npm задаёт Node из
  `engines`/`.nvmrc`/CI (§2.2).
- **Lock-файлы коммитим** (`package-lock.json`), из `.gitignore` убраны (§4.1).
- **Без UMD**: только ESM + CJS (§4.3).
- **tsdown** — сборщик библиотек (§2.3); CSS-only остаётся на Vite + Lightning CSS (§5.4).

---

## 3. Как начать работу с пакетом

```bash
nvm use            # версия из .nvmrc (20.19.0)
npm ci             # воспроизводимая установка из package-lock.json
npm run verify     # полная проверка (см. §4)
```

---

## 4. Стандартные скрипты (`assembly.md` §6)

| Скрипт | Назначение |
|--------|-----------|
| `clean` | `rimraf dist` |
| `build` | `tsdown` (CSS-only — `vite build`) |
| `lint` / `lint:fix` / `format` | Biome (CSS-only — Stylelint) |
| `typecheck` | `tsc -p tsconfig.json --noEmit` |
| `test:smoke` | `node --test "tests/**/*.js"` — читает `dist`, не собирает |
| `test:unit` | `vitest-runner run <dir>` — только для пакетов с unit-тестами |
| `pack:check` | `npm pack --dry-run && publint && attw --pack . --profile node16` |
| `verify` | единая цепочка; `build` ровно один раз; дешёвые проверки — до сборки |
| `prepublishOnly` | `clean && verify` |

CSS-сабпас (§5.3): `attw … --exclude-entrypoints <name>.css`. CSS-only (§5.4): `pack:check` без
`attw`. Для config-/bin-пакетов `@ux-ui/*` — сокращённый контракт (`assembly.md` §6).

---

## 5. Структура пакета

```
src/                 публичный код (entry: src/index.ts)
tests/               smoke (node --test) и/или unit (vitest)
dist/                артефакты сборки — НЕ коммитятся
tsconfig.json        для разработки/typecheck; extends @ux-ui/tsconfig-base
tsconfig.build.json  только публичный src; передаётся tsdown через dts.tsconfig
tsdown.config.ts     defineLibrary()/defineCssLibrary() из @ux-ui/tsdown-config
biome.json           extends @ux-ui/biome-config
```

---

## 6. Стандарт упаковки (`assembly.md` §4–§5)

- `"type": "module"`, `main: index.cjs`, `module: index.js`, `types: index.d.ts`.
- Артефакты: `dist/index.js` (ESM) + `dist/index.cjs` (CJS) + `.d.ts`/`.d.cts`; **без UMD**.
- `exports`: только `types`/`import`/`require`; типы **внутри** каждого условия (`index.d.ts` для
  ESM, `index.d.cts` для CJS); без верхнеуровневого `default`/`browser`; `exports` фиксируем руками
  (автогенерацию tsdown не используем).
- `files` минимален (`dist`, `README.md`, `LICENSE`); `publishConfig.access: public`.
- `sideEffects`: `false` для JS/TS, `["*.css"]` для CSS-sidecar.
- `engines.node: ">=20.19.0"`, `.nvmrc` = `20.19.0`.

---

## 7. Конфиги (shared)

| Пакет | Как подключается |
|-------|------------------|
| `@ux-ui/tsconfig-base` | `"extends": "@ux-ui/tsconfig-base/tsconfig.json"` в `tsconfig.json` |
| `@ux-ui/biome-config` | `"extends": ["@ux-ui/biome-config/biome"]` в `biome.json` |
| `@ux-ui/tsdown-config` | `defineLibrary()` / `defineCssLibrary({ cssFileName })` в `tsdown.config.ts` |
| `@ux-ui/vitest-runner` | `"test:unit": "vitest-runner run <dir>"` (Windows-фикс §6) |

Per-package значения (`rootDir`/`outDir`/`include`, опц. `noUnusedLocals`/`noUnusedParameters`)
остаются в самом пакете. Правка стандарта = правка одного shared-пакета.

---

## 8. Версии и зависимости

Единые версии (Syncpack — per-repo, опционально; кросс-репо — Renovate, `assembly.md` §7).
Текущая матрица (источник — пилот, `shared-configs.txt`):

| Группа | Пакеты и версии |
|--------|-----------------|
| Сборка (TS) | `typescript@6.0.3`, `tsdown@0.22.3` (порог `>=0.21.5`), `publint@^0.3.21`, `@arethetypeswrong/cli@^0.18.3`, `rimraf@6.1.3`, `@types/node@25.9.2` |
| Линт | `@biomejs/biome@2.4.16` |
| Тест-тулчейн (unit) | `vitest@4.1.9` + `@vitest/*` синхронно; **`vite` НЕ в devDeps** (приходит транзитивно через Vitest, §4.2/§6) |
| CSS sidecar (§5.3) | `@tsdown/css@^0.22.3`, `sass-embedded@^1.100.0` |

Политика runtime-зависимостей (bundle/external/peer) — `assembly.md` §5.6. Renovate-пресет —
центральный репозиторий `ux-ui-pro/renovate-config` (`renovate.json` ссылается на него; §7 п.5).

---

## 9. Тесты

- **Smoke** (обязательно): импорт публичного API из `dist` (ESM и CJS) + проверка физического
  состава `dist` (все заявленные артефакты). Не собирает.
- **Unit** (где есть): Vitest через `@ux-ui/vitest-runner`. Vitest требует Vite `>=6` и Node `>=20`;
  Vite — транзитивно. Запуск `vitest-runner run <dir>` решает Windows-баг регистра буквы диска.

---

## 10. Релизный процесс (`assembly.md` §8–§9)

- Semver. **Breaking упаковки** (переименование артефактов, удаление UMD/`default`/`browser`,
  подъём `engines`) → **major** + запись в `CHANGELOG.md` + секция миграции в README (§9).
- Публикация — только из CI: `npm publish --provenance --access public` через Trusted Publishing
  (OIDC), без долгоживущего `NPM_TOKEN` (§8). Локальный `prepublishOnly` — защитный слой, не точка
  истины.

---

## 11. CI (`assembly.md` §8)

- GitHub Action `verify` на каждый PR, matrix Node `22 / 24` (нижняя граница = `engines`).
- Публикация по тегу/релизу через Trusted Publishing.
- Renovate (shared-пресет) против дрейфа версий.

См. `.github/workflows/verify.yml` в этом репозитории как эталон.

---

## 12. Чеклист соответствия (на пакет)

Короткая версия `assembly.md` §12:

- [ ] `packageManager`, `engines>=20.19.0`, `.nvmrc`, закоммичен `package-lock.json`
- [ ] `exports` только `types/import/require`, без `default`/`browser`
- [ ] Сборка tsdown; артефакты `index.js`+`index.cjs`(+типы), без UMD
- [ ] `files` минимален, `publishConfig.access: public`, `sideEffects` отражает реальность
- [ ] Контракт скриптов §6; `build` один раз в `verify`; `pack:check` зелёный
- [ ] `tsconfig.build.json`; конфиги через shared-пакеты `@ux-ui/*`
- [ ] Smoke (API + состав `dist`); unit через `vitest-runner` (если есть)
- [ ] Breaking упаковки → major + CHANGELOG + миграция в README
- [ ] README по §13 + ссылка на `STANDARDS.md`

---

## 13. Оформление README (`assembly.md` §13)

Эталон — `README.md` этого репозитория (шаблон по §13.2/§13.3): только markdown без HTML-обёрток,
разделители `---`, `#` — только имя пакета, npm-команды установки, английский язык, бейджи
версии+загрузок, канонический порядок секций. README пакета ориентирован на потребителя; правила
разработки **не дублируются** — ссылка на этот `STANDARDS.md` в секции Contributing (§13.4).

---

## 14. Создание нового пакета

1. Взять `_template-repo` как старт (вариант §5.1): скопировать структуру, убрать `"private": true`,
   заполнить `name`/`description`/`repository`/`keywords`, заменить пример из `src/index.ts`.
2. Выбрать вариант шаблона (`assembly.md` §5) и применить дельту к базе §5.1:

   - **§5.2 multi-entry** (`plinkit`): `entry: ['src/index.ts', 'src/internal.ts']` в
     `defineLibrary`; internal-артефакты **не** в `files` (whitelist вместо каталога `dist`); smoke
     проверяет оба артефакта; runtime-зависимость — по §5.6.
   - **§5.3 WC + CSS sidecar** (± Vue): `defineCssLibrary({ cssFileName: '<name>.css', ... })`;
     devDeps `@tsdown/css` + `sass-embedded`; в `exports` — CSS-сабпас `"./<name>.css"` (ассет без
     типов) + поле `style`; `sideEffects: ["*.css"]`; `pack:check` с
     `--exclude-entrypoints <name>.css`. Vue-обёртка: сабпас `"./vue"` + `vue` в `peerDependencies`
     (`optional`), `deps.neverBundle: ['vue']`.
   - **§5.4 CSS-only** (`typographics`, `gridline`): **не tsdown** — Vite + Lightning CSS +
     Stylelint; корневой CSS-export `exports["."]` + `style`; контракт скриптов CSS-варианта §6
     (без `attw`).
   - **§5.5 Vite-plugin**: `defineLibrary({ platform: 'node' })`; `vite` в `peerDependencies`;
     runtime-зависимости по §5.6; линт — общий Biome.

3. Пройти чеклист §12 и `npm run verify`.

Спорные/новые решения по стандарту не принимаются молча — выносятся ревьюеру (`assembly.md` §5).
