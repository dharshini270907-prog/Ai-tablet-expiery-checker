let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx ??= new AC();
  return ctx;
}

function tone(freq: number, duration: number, gain: number, delay = 0) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "square";
  osc.frequency.value = freq;
  osc.connect(g).connect(ac.destination);
  const start = ac.currentTime + delay;
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.start(start);
  osc.stop(start + duration);
}

/** Loud 880Hz block alert (triple burst). */
export const playBlockAlert = () => {
  tone(880, 0.28, 0.28);
  tone(880, 0.28, 0.28, 0.34);
  tone(880, 0.4, 0.28, 0.68);
};

/** Soft near-expiry warning. */
export const playWarningAlert = () => tone(520, 0.18, 0.09);

/** Successful scan beep. */
export const playSuccessBeep = () => tone(1180, 0.09, 0.06);