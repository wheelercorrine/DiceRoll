let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playDiceSound(count = 1) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bounces = Math.min(12, Math.max(3, Math.floor(count * 2.5)));

    for (let i = 0; i < bounces; i++) {
      const delay = Math.random() * 0.35 + i * 0.03;
      const hitTime = now + delay;

      // Short noise burst + bandpass filter to simulate dice impact
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Randomize pitch of impact
      const freq = 400 + Math.random() * 800;
      osc.type = Math.random() > 0.5 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, hitTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, hitTime + 0.05);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq * 1.5, hitTime);
      filter.Q.setValueAtTime(3, hitTime);

      const volume = Math.max(
        0.02,
        0.18 * (1 - i / bounces) * (Math.random() * 0.5 + 0.5),
      );
      gain.gain.setValueAtTime(volume, hitTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, hitTime + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(hitTime);
      osc.stop(hitTime + 0.07);
    }
  } catch {
    // Graceful fallback if Web Audio is blocked or unsupported
  }
}
