// Synthesized mechanical keyboard "thock" for the theme toggle.
// No audio asset: a layered Web Audio click (low body + filtered noise click)
// played on the user gesture, so it satisfies browser autoplay policy.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type ClickOpts = {
  bodyFreq: number; // starting pitch of the low "thock" body
  bodyTo: number; // pitch it drops to
  bodyGain: number; // body loudness
  clickFreq: number; // bandpass center of the high click
  clickGain: number; // click loudness
};

function click(ac: AudioContext, out: GainNode, at: number, o: ClickOpts) {
  // Low body — gives the deep "thock"
  const body = ac.createOscillator();
  body.type = "sine";
  body.frequency.setValueAtTime(o.bodyFreq, at);
  body.frequency.exponentialRampToValueAtTime(o.bodyTo, at + 0.06);
  const bodyGain = ac.createGain();
  bodyGain.gain.setValueAtTime(0.0001, at);
  bodyGain.gain.exponentialRampToValueAtTime(o.bodyGain, at + 0.004);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.12);
  body.connect(bodyGain).connect(out);
  body.start(at);
  body.stop(at + 0.13);

  // Filtered noise burst — the sharp top-end "click"
  const dur = 0.05;
  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const noise = ac.createBufferSource();
  noise.buffer = buffer;
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = o.clickFreq;
  bp.Q.value = 0.9;
  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.0001, at);
  noiseGain.gain.exponentialRampToValueAtTime(o.clickGain, at + 0.002);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.03);
  noise.connect(bp).connect(noiseGain).connect(out);
  noise.start(at);
  noise.stop(at + dur);
}

export function playSwitchSound() {
  const ac = getCtx();
  if (!ac) return;

  const now = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = 0.17;
  master.connect(ac.destination);

  // Press — bottom-out: full, low and weighty
  click(ac, master, now, {
    bodyFreq: 190,
    bodyTo: 115,
    bodyGain: 0.7,
    clickFreq: 2600,
    clickGain: 0.45,
  });
  // Release — top-out: softer, brighter, a beat later
  click(ac, master, now + 0.085, {
    bodyFreq: 240,
    bodyTo: 175,
    bodyGain: 0.28,
    clickFreq: 3200,
    clickGain: 0.22,
  });
}
