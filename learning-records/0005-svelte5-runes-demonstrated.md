# Svelte 5 Runes — Demonstrated in Real Code

The user completed the runes lesson and applied $state, $derived, $effect, and untrack in the notes page (`src/routes/examples/notes/+page.svelte`). The implementation is non-trivial: `untrack()` is used to initialise `body` from `form?.body` without creating a reactive dependency, and `$effect` includes a cleanup return function for `document.title`.

**Evidence**: Working implementation in the project codebase. All four rune types used correctly, including the subtler patterns (untrack, effect cleanup).

**Implications**: $state, $derived, $effect, $props are all operational knowledge. `untrack` is understood. Future lessons can treat runes as a known primitive. Next natural step: layout load functions and protected route groups (directly serves the "auth + protected routes" mission goal).
