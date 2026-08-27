<p>
  <a href="https://draperhq.com">
    <img src="public/brand/draper-mark.png" alt="Draper" width="72" height="72">
  </a>
</p>

# Backstage

**The first version of Backstage was built ten minutes before a client call.**

Our eight-slide deck had to carry a timer, private questions, research notes and an appendix we needed to reach without breaking eye contact.

The client only needed the story.

We needed somewhere to put everything behind it.

So we added one key.

Press `P` and the deck opens a private control window. The client keeps the clean presentation. We see the clock, the next question and the shortest route into the appendix.

We used it that afternoon and kept it for the next call.

Draper tells stories for founders. We spend days finding the line that makes a complicated company feel clear, but the story still has to survive thirty live minutes of interruptions, objections and good questions. Backstage helps the person presenting hold that room without putting their working notes on show.

If you present for a living, you may have the same parts scattered across a phone timer, a document and twenty hidden slides. Backstage puts them beside the deck.

We stripped out every client name and private note, rebuilt the example with fictional data, and released it under MIT.

**[Open the live demo](https://backstage-deck-demo.draper-5413.chatgpt.site)** or fork it for your next call.

[![Backstage dual-screen demo](public/backstage-dual-screen.gif)](public/backstage-dual-screen.mp4)

## Run it locally

```bash
npm install
npm run dev
```

Open the local URL, then press `P`. Drag the new tab into a separate window and share only the deck window.

## Demo features

- Synchronised deck and presenter windows
- A 30-minute timer with a one-click run of show
- Direct appendix routes for common client objections
- Per-slide `Ask`, `Why`, `Say`, and `Caution` prompts
- Keyboard navigation with second-screen setup guidance

## The two-window setup

The deck and presenter window stay in sync through the browser's `BroadcastChannel` API. Click a slide or appendix route in Backstage and the shared deck moves with you.

The Remotion source for the demo above lives in `remotion/`. Run `npm run video:studio` to inspect it or `npm run video:render` to make a fresh MP4.

## Privacy boundary

The fictional runbook in this public demo is safe to inspect. In a real implementation, keep private presenter data out of the public deck bundle. Load it from a local file or an authenticated presenter-only route, keyed by public slide IDs.

## Design language

Broadcast Modernism: Archivo Black, Public Sans, hard cuts, rundown logic, tally red, signal blue and status-only colour.

All companies and results shown in this demo are fictional.

Built inside [Draper](https://draperhq.com). Released for anyone who presents work.

## License

MIT
