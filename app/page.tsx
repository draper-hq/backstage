'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Slide = { id: string; section: string; title: string; next: string; render: (jump: (index: number) => void) => React.ReactNode };
type Note = { ask: string; why: string; say: string; caution?: string };
type SyncMessage = { type: 'jump'; index: number } | { type: 'state'; index: number } | { type: 'ready' };

const CHANNEL = 'backstage-demo-v1';
const MAIN_COUNT = 5;

const objectionRoutes = [
  { prompt: '“How does this pay back?”', label: 'ROI model', index: 6 },
  { prompt: '“Can you actually attribute it?”', label: 'Measurement', index: 7 },
  { prompt: '“This feels too big to start.”', label: '90-day scope', index: 8 },
  { prompt: '“Legal will slow everything down.”', label: 'Governance', index: 9 },
];

const slides: Slide[] = [
  {
    id: 'opening', section: 'OPENING', title: 'Build trust before the form fill.', next: 'The signal',
    render: () => <>
      <div className="hero-copy">
        <h1>Build trust before the <em>form fill.</em></h1>
        <p className="slide-lede">A fictional five-slide demonstration of Backstage.</p>
      </div>
      <div className="hero-signal" aria-hidden="true"><span>01</span><b>ON AIR</b></div>
    </>,
  },
  {
    id: 'signal', section: 'CONTEXT', title: 'The signal arrives first.', next: 'The system',
    render: () => <>
      <h2>The signal arrives <em>before</em> attribution catches up.</h2>
      <div className="metric-strip">
        <article><strong>01</strong><h3>Attention</h3><p>The right people start recognising your name.</p></article>
        <article><strong>02</strong><h3>Familiarity</h3><p>Your point of view enters private conversations.</p></article>
        <article><strong>03</strong><h3>Intent</h3><p>The opportunity appears with trust already attached.</p></article>
      </div>
    </>,
  },
  {
    id: 'system', section: 'PROPOSAL', title: 'One voice becomes a system.', next: 'The receipt',
    render: () => <>
      <h2>One voice becomes a <em>distribution system.</em></h2>
      <div className="system-map">
        <div className="system-node primary-node"><span>FOUNDER</span><b>Point of view</b></div><i aria-hidden="true" />
        <div className="system-node"><span>TEAM</span><b>Proof in motion</b></div><i aria-hidden="true" />
        <div className="system-node"><span>MARKET</span><b>Compounding trust</b></div>
      </div>
    </>,
  },
  {
    id: 'receipt', section: 'PROOF', title: 'Silent to familiar in 90 days.', next: 'The decision',
    render: () => <>
      <h2>From silent to familiar in <em>ninety days.</em></h2>
      <div className="receipt-grid">
        <div><span>WEEK 01</span><b>0</b><p>recognisable market voice</p></div>
        <div className="receipt-arrow">→</div>
        <div><span>WEEK 12</span><b>36</b><p>high-quality market moments</p></div>
        <div className="receipt-outcome"><span>THE OUTCOME</span><p>Three named opportunities referenced ideas from the programme.</p></div>
      </div>
    </>,
  },
  {
    id: 'decision', section: 'DECISION', title: 'Run the experiment.', next: 'End',
    render: () => <>
      <h2>Run the experiment.<br /><em>Measure the signal.</em></h2>
      <div className="decision-line"><span>90 DAYS</span><span>3 VOICES</span><span>1 SCOREBOARD</span></div>
      <p className="decision-question">What would make this impossible to dismiss?</p>
    </>,
  },
  {
    id: 'appendix', section: 'APPENDIX', title: 'Follow the client’s question.', next: 'Choose an objection',
    render: (jump) => <>
      <h2>Do not present this.<br /><em>Route through it.</em></h2>
      <div className="appendix-menu">
        {objectionRoutes.map((route, index) => <button key={route.label} onClick={() => jump(route.index)}><span>{String(index + 1).padStart(2, '0')}</span><div><small>IF THEY SAY</small><b>{route.prompt}</b></div><i>→</i></button>)}
      </div>
    </>,
  },
  {
    id: 'roi', section: 'APPENDIX · ROI', title: 'One opportunity clears the pilot.', next: 'Return to the conversation',
    render: () => <>
      <h2>One opportunity can <em>clear the pilot.</em></h2>
      <div className="edge-ledger"><div><span>PILOT</span><b>£12k</b><p>ninety-day investment</p></div><div><span>ONE CUSTOMER</span><b>£18k</b><p>fictional first-year value</p></div><div className="edge-answer"><span>THE TEST</span><b>1</b><p>attributed customer reaches breakeven</p></div></div>
    </>,
  },
  {
    id: 'attribution', section: 'APPENDIX · MEASUREMENT', title: 'Measure three layers of signal.', next: 'Return to the conversation',
    render: () => <>
      <h2>Measure three layers.<br /><em>Claim only what is true.</em></h2>
      <div className="metric-strip"><article><strong>01</strong><h3>Sourced</h3><p>The opportunity explicitly began with the channel.</p></article><article><strong>02</strong><h3>Influenced</h3><p>A named buyer references the content during the journey.</p></article><article><strong>03</strong><h3>Market signal</h3><p>The target audience starts appearing around the account.</p></article></div>
    </>,
  },
  {
    id: 'scope', section: 'APPENDIX · SCOPE', title: 'Start narrow. Earn the scale.', next: 'Return to the conversation',
    render: () => <>
      <h2>Start narrow.<br /><em>Earn the right to scale.</em></h2>
      <div className="scope-track"><div><span>01–30</span><b>Find the voice</b><p>One leader. One audience. One measurement baseline.</p></div><div><span>31–60</span><b>Prove the signal</b><p>Double down on topics attracting the right market.</p></div><div><span>61–90</span><b>Add one voice</b><p>Expand only after the first channel is working.</p></div></div>
    </>,
  },
  {
    id: 'governance', section: 'APPENDIX · GOVERNANCE', title: 'Approval is part of the system.', next: 'Return to the conversation',
    render: () => <>
      <h2>Approval is part of<br /><em>the operating system.</em></h2>
      <div className="governance-flow"><div><span>01</span><b>Green topics</b><p>Pre-approved territories that publish quickly.</p></div><i>→</i><div><span>02</span><b>Amber claims</b><p>Evidence checked against a named source.</p></div><i>→</i><div><span>03</span><b>Red lines</b><p>Subjects that never enter the drafting queue.</p></div></div>
    </>,
  },
];

const notes: Record<string, Note> = {
  opening: { ask: 'Does this match the outcome you want from today?', why: 'Set the contract before the detail begins.', say: 'We will show the signal, the system and the evidence, then agree the experiment.' },
  signal: { ask: 'Where do you currently notice influence that your CRM cannot explain?', why: 'Let the buyer name the attribution gap in their own words.', say: 'We measure what can be sourced, then deliberately collect evidence of influence.' },
  system: { ask: 'Whose voice could credibly join the founder after the first month?', why: 'The answer reveals whether the programme can compound beyond one account.', say: 'The founder establishes the point of view. The team turns it into visible operating proof.' },
  receipt: { ask: 'Which proof would carry the most weight internally?', why: 'Match the evidence to the decision the buyer must defend.', say: 'Use one relevant receipt. Do not narrate an entire portfolio.', caution: 'All companies and results in this public demo are fictional.' },
  decision: { ask: 'What would need to happen next for this to become a real experiment?', why: 'End with an owner, action and date.', say: 'Confirm the decision path before discussing more ideas.' },
  appendix: { ask: 'Which part would be most useful to pressure-test?', why: 'The appendix is responsive evidence, not a second presentation.', say: 'Listen to the objection, open one answer, resolve it, then return to the exact conversation you left.' },
  roi: { ask: 'What customer value should we use in the real calculation?', why: 'Replace generic ROI with the buyer’s own economics.', say: 'The fictional example shows the mechanic. The real model must use their value and close rate.', caution: 'Never present fictional values as benchmarks.' },
  attribution: { ask: 'Would sourced, influenced and market-signal reporting be enough to judge this fairly?', why: 'Agree the measurement standard before the work begins.', say: 'We will distinguish what started with content from what content merely influenced.' },
  scope: { ask: 'Would one leader and one audience make this small enough to test?', why: 'Reduce perceived operational risk without weakening the experiment.', say: 'Scale becomes a consequence of signal, never an assumption at the start.' },
  governance: { ask: 'Who needs to approve claims, and what can be pre-approved?', why: 'Approval speed is an operating constraint that can be designed around.', say: 'Create green territories, amber claims and explicit red lines before publishing begins.' },
};

function useDeckSync(presenter: boolean) {
  const [current, setCurrent] = useState(0);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const currentRef = useRef(0);
  useEffect(() => { currentRef.current = current; }, [current]);
  const send = useCallback((message: SyncMessage) => channelRef.current?.postMessage(message), []);
  const jump = useCallback((index: number) => {
    const safe = Math.max(0, Math.min(slides.length - 1, index));
    setCurrent(safe);
    send(presenter ? { type: 'jump', index: safe } : { type: 'state', index: safe });
  }, [presenter, send]);
  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL);
    channelRef.current = channel;
    channel.onmessage = ({ data }: MessageEvent<SyncMessage>) => {
      if (data.type === 'jump' && !presenter) setCurrent(data.index);
      if (data.type === 'state' && presenter) setCurrent(data.index);
      if (data.type === 'ready' && !presenter) channel.postMessage({ type: 'state', index: currentRef.current } satisfies SyncMessage);
    };
    if (presenter) channel.postMessage({ type: 'ready' } satisfies SyncMessage);
    return () => channel.close();
  }, [presenter]);
  useEffect(() => { if (!presenter) send({ type: 'state', index: current }); }, [current, presenter, send]);
  return { current, jump };
}

function Deck() {
  const { current, jump } = useDeckSync(false);
  const slide = slides[current];
  const [showSetupTip, setShowSetupTip] = useState(false);
  const lastMainRef = useRef(0);
  useEffect(() => {
    if (current < MAIN_COUNT) lastMainRef.current = current;
  }, [current]);
  const openBackstage = useCallback(() => {
    const url = new URL(window.location.href); url.searchParams.set('presenter', '1');
    window.open(url, '_blank');
    setShowSetupTip(true);
    window.setTimeout(() => setShowSetupTip(false), 12000);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'p') openBackstage();
      if (event.key.toLowerCase() === 'a') jump(5);
      if (event.key === 'Escape' && current >= MAIN_COUNT) jump(lastMainRef.current);
      if (event.key === 'ArrowRight' || event.key === ' ') jump(current + 1);
      if (event.key === 'ArrowLeft') jump(current - 1);
    };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [current, jump, openBackstage]);
  return <main className="deck-shell">
    <header className="deck-header"><div className="wordmark"><span>BACK</span>STAGE</div><div className="deck-meta">PUBLIC DEMO · NORTHSTAR SYSTEMS</div><button onClick={openBackstage} className="key-button"><kbd>P</kbd> BACKSTAGE</button></header>
    {showSetupTip && <aside className="deck-setup-tip"><span>BACKSTAGE OPENED</span><b>Drag the new tab out into a separate window.</b><p>Keep it beside this deck, then share only the deck window.</p></aside>}
    <section key={slide.id} className={"slide slide-" + slide.id}>{slide.render(jump)}</section>
    <footer className="deck-footer">
      <div><span>NOW</span><b>{String(current + 1).padStart(2, '0')} · {slide.title}</b></div>
      <div className="next-label"><span>NEXT</span><b>{slide.next}</b></div>
      <nav><button className="appendix-button" onClick={() => current >= MAIN_COUNT ? jump(lastMainRef.current) : jump(5)}>{current >= MAIN_COUNT ? 'BACK TO DECK' : 'A · APPENDIX'}</button><button onClick={() => jump(current - 1)} disabled={current === 0}>←</button><span>{current + 1} / {slides.length}</span><button onClick={() => jump(current + 1)} disabled={current === slides.length - 1}>→</button></nav>
    </footer>
  </main>;
}

function Controller() {
  const { current, jump } = useDeckSync(true);
  const [seconds, setSeconds] = useState(30 * 60);
  const [running, setRunning] = useState(false);
  const slide = slides[current]; const note = notes[slide.id];
  const lastMainRef = useRef(0);
  useEffect(() => {
    if (current < MAIN_COUNT) lastMainRef.current = current;
  }, [current]);
  const time = String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);
  return <main className="control-shell">
    <header className="control-header">
      <div><div className="control-brand"><i /> BACKSTAGE</div><p>Presenter control · private view</p></div>
      <div className={"timecode " + (seconds < 300 ? 'time-warning' : '')}><span>{time}</span><button onClick={() => setRunning(!running)}>{running ? 'PAUSE' : 'START'}</button></div>
    </header>
    <section className="setup-strip"><span>SECOND-SCREEN SETUP</span><div><b>Drag this tab out into a separate window.</b><p>Keep it beside the deck. Share only the deck window.</p></div></section>
    <section className="on-air"><span>● ON AIR</span><div><small>{String(current + 1).padStart(2, '0')} · {slide.section}</small><h1>{slide.title}</h1></div><button onClick={() => current >= MAIN_COUNT ? jump(lastMainRef.current) : jump(current + 1)} disabled={current === MAIN_COUNT - 1}>{current >= MAIN_COUNT ? 'BACK TO DECK' : 'TAKE NEXT'} <b>→</b></button></section>
    <div className="control-grid">
      <section className="rundown"><header><span>RUN OF SHOW</span><small>{MAIN_COUNT} MAIN SLIDES</small></header>{slides.slice(0, MAIN_COUNT).map((item, index) => <button key={item.id} onClick={() => jump(index)} className={current === index ? 'active' : ''}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{item.section}</small><b>{item.title}</b></div>{current === index && <i>LIVE</i>}</button>)}
        <div className="objection-router"><header><span>IF THEY SAY…</span><small>ROUTE, ANSWER, RETURN</small></header>{objectionRoutes.map((route) => <button key={route.label} onClick={() => jump(route.index)} className={current === route.index ? 'active' : ''}><span>{route.prompt}</span><b>{route.label} →</b></button>)}</div>
      </section>
      <section className="runbook">
        <article><span>ASK</span><h2>{note.ask}</h2></article>
        <article><span>WHY THIS SLIDE</span><p>{note.why}</p></article>
        <article><span>SAY</span><p>{note.say}</p></article>
        {note.caution && <article className="caution"><span>CAUTION</span><p>{note.caution}</p></article>}
      </section>
    </div>
    <footer className="control-footer"><span>SHARE THE DECK WINDOW ONLY</span><div><kbd>←</kbd><kbd>→</kbd> NAVIGATE · <kbd>P</kbd> OPEN</div></footer>
  </main>;
}

export default function Home() {
  const presenter = useMemo(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('presenter'), []);
  return presenter ? <Controller /> : <Deck />;
}
