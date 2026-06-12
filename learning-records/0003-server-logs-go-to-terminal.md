# Server-side console.log goes to the terminal, not the browser

The user hit this during the hooks.server.ts lesson: `console.log` in any server-side file (`hooks.server.ts`, `+page.server.ts`, `+server.ts`) outputs to the terminal running `npm run dev`, not the browser's DevTools console. The browser only shows client-side logs.

**Implications**: When debugging server code, always check the terminal first. Future lessons should reinforce this distinction — it's a reliable confusion point, especially coming from Vue/Nuxt where the line between server and client output is less obvious in day-to-day dev.
