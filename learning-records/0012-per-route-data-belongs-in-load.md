# Per-Route Data Belongs in Load Functions, Not Shared State

Data that changes per route — like a page title — should be returned from load functions and read via `$page.data` in the layout. This is SvelteKit's idiomatic pattern and works with SSR automatically.

Module state (singleton) would require manually syncing with navigation, reimplementing what SvelteKit already tracks. Context API flows downward, so children can't push values up to a layout — it's the wrong direction for "child route tells layout what to display."

**Rule of thumb**: if data is per-route, use load functions. Reserve module state for app-wide concerns not tied to navigation (e.g. toasts). Reserve context for per-component-tree state that flows parent → child (e.g. edit mode).

**Nuxt analogy**: this is like using `useHead()` or returning `head` from `definePageMeta` — the framework owns the per-route metadata pipeline, you don't build your own.

**Implications**: Before reaching for shared state, ask "is this per-route?" If yes, it belongs in a load function. The `$page.data` object in layouts is the bridge between route-level data and app-level UI.
