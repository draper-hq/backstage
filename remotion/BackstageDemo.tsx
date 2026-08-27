import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadArchivo} from '@remotion/google-fonts/ArchivoBlack';
import {loadFont as loadPublicSans} from '@remotion/google-fonts/PublicSans';

const {fontFamily: displayFont} = loadArchivo('normal', {
  weights: ['400'],
  subsets: ['latin'],
});
const {fontFamily: bodyFont} = loadPublicSans('normal', {
  weights: ['400', '600', '700'],
  subsets: ['latin'],
});

const colours = {
  ink: '#17191c',
  paper: '#f4f0e7',
  blue: '#3157f5',
  red: '#ef523f',
  straw: '#ead36b',
  muted: '#a8a7a2',
};

const ease = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });

const BrowserChrome: React.FC<{
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}> = ({title, dark = false, children}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      border: `2px solid ${dark ? '#3b3d40' : colours.ink}`,
      background: dark ? colours.ink : colours.paper,
      boxShadow: '0 28px 70px rgba(16,18,20,.18)',
    }}
  >
    <div
      style={{
        height: 42,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 15px',
        borderBottom: `1px solid ${dark ? '#3b3d40' : '#c9c5bb'}`,
        color: dark ? colours.paper : colours.ink,
        fontFamily: bodyFont,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '.04em',
      }}
    >
      <span style={{width: 10, height: 10, borderRadius: '50%', background: colours.red}} />
      <span style={{width: 10, height: 10, borderRadius: '50%', background: colours.straw}} />
      <span style={{width: 10, height: 10, borderRadius: '50%', background: colours.blue}} />
      <span style={{marginLeft: 8, opacity: 0.6}}>{title}</span>
    </div>
    <div style={{height: 'calc(100% - 42px)'}}>{children}</div>
  </div>
);

const PublicDeck: React.FC<{routeProgress: number}> = ({routeProgress}) => (
  <div style={{height: '100%', position: 'relative', background: colours.paper, color: colours.ink}}>
    <div
      style={{
        height: 44,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 28px',
        borderBottom: '1px solid #c9c5bb',
        fontFamily: bodyFont,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '.08em',
      }}
    >
      <span style={{fontFamily: displayFont, fontSize: 16, letterSpacing: '-.04em'}}>
        <span style={{color: colours.blue}}>BACK</span>STAGE
      </span>
      <span>PUBLIC DEMO</span>
    </div>
    <div style={{position: 'absolute', inset: '44px 0 48px', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '76px 64px',
          opacity: 1 - routeProgress,
          transform: `translateX(${-32 * routeProgress}px)`,
        }}
      >
        <div style={{fontFamily: displayFont, fontSize: 69, lineHeight: .9, letterSpacing: '-.055em'}}>
          BUILD TRUST BEFORE<br />THE <span style={{color: colours.blue}}>FORM FILL.</span>
        </div>
        <div style={{marginTop: 28, fontFamily: bodyFont, fontSize: 16, color: '#66635d'}}>
          A fictional demonstration of Backstage.
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '64px',
          opacity: routeProgress,
          transform: `translateX(${32 * (1 - routeProgress)}px)`,
        }}
      >
        <div style={{fontFamily: displayFont, fontSize: 61, lineHeight: .92, letterSpacing: '-.055em'}}>
          ONE OPPORTUNITY CAN<br /><span style={{color: colours.blue}}>CLEAR THE PILOT.</span>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', marginTop: 40, borderBlock: '1px solid #c9c5bb'}}>
          {[
            ['PILOT', '£12k'],
            ['ONE CUSTOMER', '£18k'],
            ['THE TEST', '1'],
          ].map(([label, value], index) => (
            <div
              key={label}
              style={{
                minHeight: 120,
                padding: 18,
                borderRight: index < 2 ? '1px solid #c9c5bb' : undefined,
                background: index === 2 ? colours.blue : undefined,
                color: index === 2 ? colours.paper : colours.ink,
              }}
            >
              <div style={{fontFamily: bodyFont, fontSize: 9, fontWeight: 700, letterSpacing: '.08em'}}>{label}</div>
              <div style={{fontFamily: displayFont, fontSize: 46, marginTop: 18}}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        inset: 'auto 0 0',
        height: 48,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 28px',
        borderTop: '1px solid #c9c5bb',
        fontFamily: bodyFont,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '.08em',
      }}
    >
      <span>{routeProgress > .5 ? '07 · ROI MODEL' : '01 · OPENING'}</span>
      <span>A · APPENDIX&nbsp;&nbsp;&nbsp; →</span>
    </div>
  </div>
);

const PresenterPanel: React.FC<{routeProgress: number; pulse: number}> = ({routeProgress, pulse}) => (
  <div style={{height: '100%', padding: 24, background: colours.ink, color: colours.paper, fontFamily: bodyFont}}>
    <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 18, borderBottom: '1px solid #3b3d40'}}>
      <div>
        <div style={{fontFamily: displayFont, fontSize: 17}}><span style={{color: colours.red}}>●</span> BACKSTAGE</div>
        <div style={{marginTop: 4, fontSize: 9, letterSpacing: '.08em', color: '#8d8e8f'}}>PRESENTER CONTROL</div>
      </div>
      <div style={{fontFamily: displayFont, fontSize: 26}}>27:42</div>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: '90px 1fr', gap: 14, padding: '18px 0', borderBottom: '1px solid #3b3d40'}}>
      <div style={{fontSize: 9, fontWeight: 700, color: colours.red}}>● ON AIR</div>
      <div>
        <div style={{fontSize: 9, color: '#8d8e8f'}}>01 · OPENING</div>
        <div style={{marginTop: 4, fontSize: 17, fontWeight: 700}}>Build trust before the form fill.</div>
      </div>
    </div>
    <div style={{paddingTop: 18}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 9, fontWeight: 700, letterSpacing: '.08em', color: colours.straw}}>
        <span>IF THEY SAY…</span><span style={{color: '#77787a'}}>ROUTE</span>
      </div>
      {[
        ['“How does this pay back?”', 'ROI MODEL'],
        ['“Can you attribute it?”', 'MEASUREMENT'],
        ['“This feels too big.”', '90-DAY SCOPE'],
      ].map(([question, route], index) => {
        const active = index === 0 && routeProgress > .05;
        return (
          <div
            key={question}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 8px',
              marginTop: index === 0 ? 12 : 0,
              borderTop: '1px solid #343638',
              background: active ? colours.straw : 'transparent',
              color: active ? colours.ink : '#c6c6c2',
              transform: active ? `scale(${1 + pulse * .012})` : undefined,
            }}
          >
            <span style={{fontSize: 12}}>{question}</span>
            <b style={{fontSize: 8, letterSpacing: '.06em'}}>{route}</b>
          </div>
        );
      })}
    </div>
    <div style={{marginTop: 28, paddingTop: 16, borderTop: '1px solid #3b3d40'}}>
      <div style={{fontSize: 9, fontWeight: 700, letterSpacing: '.08em', color: colours.straw}}>ASK</div>
      <div style={{marginTop: 8, maxWidth: 390, fontSize: 18, lineHeight: 1.25, fontWeight: 700}}>
        What customer value should we use in the real calculation?
      </div>
    </div>
  </div>
);

export const BackstageDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = spring({frame, fps, config: {damping: 24, stiffness: 160, mass: .8}});
  const split = ease(frame, 72, 122);
  const routeProgress = ease(frame, 192, 228);
  const final = ease(frame, 290, 330);
  const pulse = Math.sin(Math.max(0, frame - 192) / 5) * (1 - ease(frame, 192, 225));

  const deckX = interpolate(split, [0, 1], [410, 70]);
  const deckY = interpolate(split, [0, 1], [186, 150]);
  const deckW = interpolate(split, [0, 1], [780, 920]);
  const deckH = interpolate(split, [0, 1], [500, 590]);
  const panelX = interpolate(split, [0, 1], [1600, 1040]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: colours.paper,
        color: colours.ink,
        fontFamily: bodyFont,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: .34,
          backgroundImage: 'linear-gradient(#beb9ae 1px, transparent 1px), linear-gradient(90deg, #beb9ae 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 70,
          zIndex: 10,
          opacity: 1 - ease(frame, 82, 105),
          transform: `translateY(${(1 - intro) * 24}px)`,
        }}
      >
        <div style={{fontFamily: displayFont, fontSize: 76, lineHeight: .9, letterSpacing: '-.055em'}}>PRESS <span style={{color: colours.blue}}>P.</span></div>
        <div style={{marginTop: 16, fontSize: 19}}>Backstage opens beside your deck.</div>
      </div>

      <div style={{position: 'absolute', left: deckX, top: deckY, width: deckW, height: deckH}}>
        <BrowserChrome title="CLIENT DECK">
          <PublicDeck routeProgress={routeProgress} />
        </BrowserChrome>
      </div>

      <div
        style={{
          position: 'absolute',
          left: panelX,
          top: 126,
          width: 490,
          height: 650,
          opacity: split,
          transform: `translateY(${(1 - split) * 28}px)`,
        }}
      >
        <BrowserChrome title="PRESENTER ONLY" dark>
          <PresenterPanel routeProgress={routeProgress} pulse={pulse} />
        </BrowserChrome>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 112,
          opacity: ease(frame, 124, 146) * (1 - final),
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '.1em',
          color: colours.blue,
        }}
      >
        SHARED WITH THE CLIENT
      </div>
      <div
        style={{
          position: 'absolute',
          right: 70,
          top: 88,
          opacity: ease(frame, 132, 154) * (1 - final),
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '.1em',
          color: colours.red,
        }}
      >
        PRESENTER ONLY
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 70px 58px',
          background: `rgba(244,240,231,${final * .94})`,
          opacity: final,
        }}
      >
        <div style={{fontFamily: displayFont, fontSize: 68, lineHeight: .92, letterSpacing: '-.05em'}}>
          ROUTE THE QUESTION.<br /><span style={{color: colours.blue}}>RETURN TO THE DECK.</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 18, borderTop: '2px solid #17191c', fontSize: 12, fontWeight: 700, letterSpacing: '.08em'}}>
          <span>BACKSTAGE</span><span>FREE AND OPEN SOURCE</span>
        </div>
      </div>
    </div>
  );
};
