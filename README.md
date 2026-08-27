# Backstage

The audience sees the presentation. You see the meeting.

Backstage is an open-source presentation experiment with a private second-screen control room. Press `P` in the demo deck to open the presenter view.

**[Open the live demo](https://backstage-deck-demo.draper-5413.chatgpt.site)**

## Run it locally

```bash
npm install
npm run dev
```

Open the local URL, then press `P`. Drag the new tab into a separate window and share only the deck window.

## Demo features

- Two-window slide synchronisation through `BroadcastChannel`
- A 30-minute meeting timer
- A one-click run of show
- Responsive appendix routing for common client objections
- Per-slide `Ask`, `Why`, `Say`, and `Caution` prompts
- Current and next slide states
- Keyboard navigation
- Second-screen setup guidance when the presenter tab opens

## Privacy boundary

The fictional runbook in this public demo is safe to inspect. In a real implementation, keep private presenter data out of the public deck bundle. Load it from a local file or an authenticated presenter-only route, keyed by public slide IDs.

The two-window demo uses the browser's `BroadcastChannel` API. Both windows must use the same origin.

## Design language

Broadcast Modernism: Archivo Black, Public Sans, hard cuts, rundown logic, tally red, signal blue and status-only colour.

All companies and results shown in this demo are fictional.

Made by [Draper](https://draperhq.com).

## License

MIT
