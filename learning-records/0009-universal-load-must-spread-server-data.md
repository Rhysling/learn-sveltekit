# Universal Load Must Explicitly Spread Server Load Data

When `+page.server.ts` and `+page.ts` coexist on the same route, SvelteKit passes the server load's return value to the universal load as `event.data`. The component receives the merged output of both — but the universal load must explicitly spread `data` in its return for the server data to survive into the component.

If `+page.ts` returns `{ images }` without spreading, `user` (from the server load) is silently dropped. The fix:

```ts
export const load: PageLoad = async ({ fetch, data }) => {
    const response = await fetch('/api/images');
    return { ...data, images: result.images ?? [] };
};
```

**Evidence**: Admin page showed `data.user` as undefined after splitting auth into `+page.server.ts` and image fetch into `+page.ts`. Spreading `...data` in the universal return restored it.

**Implications**: Any time `+page.server.ts` and `+page.ts` coexist, always `...data` in the universal load's return value. Keys in `data` that aren't spread are silently lost — no error, no warning.
