/**
 * mfp-core.ts
 * musicforprogramming.net のアニメーション & 演出エンジン（TypeScript版）
 * 
 * 依存関係ゼロ (Vanilla Web API のみ)
 * 
 * 機能一覧:
 * 1. glitchText: テキストのグリッチ・デクリプト（解読）出現/消失アニメーション
 * 2. playTerminalBeep: 5555Hz 矩形波 20ms レトロ端末クリック音
 * 3. AsciiSpectrumVisualizer: 4段カラー ASCII オーディオ・スペクトラム・ビジュアライザ
 */

export const DEFAULT_GLITCH_CHARS = "—~±§|[].+$^@*()•x%!?#";

// 共有 AudioContext (クリック音・ビジュアライザ用)
let sharedAudioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      sharedAudioCtx = new AudioCtxClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * 5555Hz 矩形波 20ms パルス音を再生する（メカニカル・端末打鍵音）
 */
export function playTerminalBeep(audioCtx?: AudioContext | null | unknown): void {
  try {
    const ctx = (typeof AudioContext !== 'undefined' && audioCtx instanceof AudioContext)
      ? audioCtx
      : getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.value = 5555;
    gain.gain.value = 0.08; // 適度な音量に調整

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    osc.start(now);
    osc.stop(now + 0.02); // 20ms の極短パルス
  } catch {
    // ブラウザの自動再生ポリシー制限等は安全に無視
  }
}

/**
 * DOM要素内のすべての TEXT_NODE を収集する
 */
export function collectTextNodes(node: Node | null): Text[] {
  const nodes: Text[] = [];
  if (!node) return nodes;

  if (node.nodeType === Node.TEXT_NODE) {
    const textNode = node as Text;
    if (textNode.nodeValue && textNode.nodeValue !== " ") {
      textNode.nodeValue = textNode.nodeValue.replace(/(\n|\r|\t)/gm, "");
      nodes.push(textNode);
    }
  } else if (node.childNodes && node.childNodes.length > 0) {
    node.childNodes.forEach((child) => {
      nodes.push(...collectTextNodes(child));
    });
  }
  return nodes;
}

function setCharAt(str: string, index: number, char: string): string {
  if (index < 0 || index >= str.length) return str;
  return str.substring(0, index) + char + str.substring(index + 1);
}

function getRandomChar(chars: string, reverse: boolean): string {
  if (reverse) {
    return "x";
  }
  return chars[Math.floor(Math.random() * chars.length)];
}

export interface GlitchTextOptions {
  duration?: number;
  delay?: number;
  reverse?: boolean;
  chars?: string;
  onComplete?: () => void;
  onTick?: (progress: number) => void;
}

export interface GlitchHandle {
  cancel: () => void;
  promise: Promise<void>;
}

/**
 * テキストのグリッチ・デクリプト（解読）アニメーションを実行
 */
export function glitchText(
  element: HTMLElement | null,
  options: GlitchTextOptions = {}
): GlitchHandle {
  const {
    duration = 1000,
    delay = 0,
    reverse = false,
    chars = DEFAULT_GLITCH_CHARS,
    onComplete,
    onTick,
  } = options;

  if (!element) {
    return { cancel: () => {}, promise: Promise.resolve() };
  }

  // 既存のアニメーションがあればキャンセル
  const el = element as HTMLElement & { _mfpGlitchCancel?: () => void };
  if (el._mfpGlitchCancel) {
    el._mfpGlitchCancel();
  }

  const textNodes = collectTextNodes(el);
  if (textNodes.length === 0) {
    if (onComplete) onComplete();
    return { cancel: () => {}, promise: Promise.resolve() };
  }

  const lengths = textNodes.map((n) => n.nodeValue?.length ?? 0);
  const originalText = textNodes.map((n) => n.nodeValue ?? "").join("");

  // 単語構造を保ちながらノーブレークスペース(\u00A0)で埋めた文字列を生成
  const spaceText = originalText
    .split(" ")
    .map((word) => "\u00A0".repeat(word.length))
    .join(" ");

  let glitchBuffer = "" + spaceText;
  const totalLen = originalText.length;
  const disturbanceFactor = Math.floor(totalLen * (reverse ? 0.25 : 1.5));
  const noiseProb = reverse ? 0.1 : 0.8;
  const direction = reverse ? -1 : 1;

  let isCancelled = false;
  let animFrameId: number | null = null;
  let delayTimeoutId: ReturnType<typeof setTimeout> | null = null;

  let resolvePromise: () => void;
  const promise = new Promise<void>((resolve) => {
    resolvePromise = resolve;
  });

  function finish() {
    if (isCancelled) return;
    delete el._mfpGlitchCancel;

    const finalText = reverse ? spaceText : originalText;
    let offset = 0;
    for (let i = 0; i < textNodes.length; i++) {
      textNodes[i].nodeValue = finalText.slice(offset, offset + lengths[i]);
      offset += lengths[i];
    }

    if (onTick) onTick(1.0);
    if (onComplete) onComplete();
    resolvePromise();
  }

  function cancel() {
    isCancelled = true;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (delayTimeoutId) clearTimeout(delayTimeoutId);
    delete el._mfpGlitchCancel;
    resolvePromise();
  }

  el._mfpGlitchCancel = cancel;

  function startAnimation() {
    const startTime = performance.now();

    function tick(currentTime: number) {
      if (isCancelled) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1.0);

      // イージング計算 (Sine Ease In-Out + 2乗加速)
      let t = -(Math.cos(Math.PI * progress) - 1) / 2;
      t = Math.pow(t, 2);
      if (reverse) t = 1 - t;

      // 解読境界とグリッチ波幅の計算
      const decodePos = Math.floor(totalLen * Math.abs(t * direction));
      const glitchWidth = Math.floor(2 * (0.5 - Math.abs(t - 0.5)) * disturbanceFactor);

      let result = "";
      if (reverse) {
        result = spaceText.slice(0, Math.max(decodePos - 1 - glitchWidth, 0));
      } else {
        result = originalText.slice(0, decodePos);
      }

      // 乱数置換（50%の確率で20ステップ実行）
      if (Math.random() < 0.5 && progress < 1 && progress > 0) {
        for (let step = 0; step < 20; step++) {
          const ratio = step / 20;
          const targetIdx = decodePos + Math.floor((1 - Math.random()) * disturbanceFactor * ratio);
          if (glitchBuffer[targetIdx] !== " ") {
            glitchBuffer = Math.random() > noiseProb
              ? setCharAt(glitchBuffer, targetIdx, originalText[targetIdx])
              : setCharAt(glitchBuffer, targetIdx, getRandomChar(chars, reverse));
          }
        }
      }

      // スライスの合成
      if (reverse) {
        result += glitchBuffer.slice(
          Math.max(decodePos - 1 - glitchWidth, 0),
          Math.max(decodePos - 1, 0)
        );
        result += originalText.slice(Math.max(decodePos - 1, 0));
      } else {
        result += glitchBuffer.slice(decodePos, decodePos + glitchWidth);
        result += spaceText.slice(decodePos + glitchWidth);
      }

      // 各TEXT_NODEに安全に分割復元（DOMタグ・スタイルを完全維持）
      let offset = 0;
      for (let i = 0; i < textNodes.length; i++) {
        textNodes[i].nodeValue = result.slice(offset, offset + lengths[i]);
        offset += lengths[i];
      }

      if (onTick) onTick(progress);

      if (progress < 1.0) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    }

    animFrameId = requestAnimationFrame(tick);
  }

  if (delay > 0) {
    delayTimeoutId = setTimeout(startAnimation, delay);
  } else {
    startAnimation();
  }

  return { cancel, promise };
}

/**
 * 4段カラー ASCII オーディオ・スペクトラム・ビジュアライザ
 */
export interface VisualizerOptions {
  rows: (HTMLElement | null)[];
  fftSize?: number;
  minDecibels?: number;
  maxDecibels?: number;
  smoothingTimeConstant?: number;
}

export class AsciiSpectrumVisualizer {
  private rows: (HTMLElement | null)[];
  private isRunning = false;
  private animFrameId: number | null = null;
  private simPhase = 0;
  private charRamp = " _.•:*^º'";

  constructor(options: VisualizerOptions) {
    this.rows = options.rows;
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = () => {
      if (!this.isRunning) return;
      this.renderSimulation();
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private renderSimulation(): void {
    this.simPhase += 0.05;
    const bandCount = 28;
    const bands: number[] = [];

    for (let i = 0; i < bandCount; i++) {
      const freq = i / bandCount;
      const v1 = Math.sin(this.simPhase * 2.5 + freq * 8) * 0.4 + 0.5;
      const v2 = Math.cos(this.simPhase * 1.2 - freq * 5) * 0.3 + 0.3;
      const v3 = (Math.random() - 0.5) * 0.15;
      bands.push(Math.max(0, Math.min(1, v1 * v2 + v3)));
    }

    const rowOffsets = [0.75, 0.5, 0.25, 0.0];
    const rampLen = this.charRamp.length;

    for (let r = 0; r < 4; r++) {
      const rowEl = this.rows[r];
      if (!rowEl) continue;

      const offset = rowOffsets[r];
      let rowChars = "";

      for (let b = 0; b < bandCount; b++) {
        const val = bands[b];
        const localVal = Math.max(0, Math.min(1, (val - offset) * 4));
        const charIdx = Math.floor(localVal * (rampLen - 1));
        rowChars += this.charRamp[charIdx];
      }

      rowEl.textContent = rowChars;
    }
  }
}
