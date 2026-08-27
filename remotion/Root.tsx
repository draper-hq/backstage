import {Composition} from 'remotion';
import {BackstageDemo} from './BackstageDemo';

export const RemotionRoot = () => (
  <Composition
    id="BackstageDualScreen"
    component={BackstageDemo}
    durationInFrames={360}
    fps={30}
    width={1600}
    height={900}
  />
);
