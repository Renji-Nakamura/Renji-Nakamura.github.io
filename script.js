// ================================
// ハッカー風エフェクト関数
// 元テキストの長さのランダム文字列から1文字ずつ元に戻すアニメーション
// ================================
// アニメーションIDを要素ごとに保持するマップ
const hackerEffectMap = new WeakMap();

function hackerEffect(el, text, delay = 50) {
  const chars = "!@#$%^&*()_+-=[]{}|;:',.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // 以前のアニメーションが存在すれば止める
  const prevInterval = hackerEffectMap.get(el);
  if (prevInterval) clearInterval(prevInterval);

  // 初期表示はランダム文字列
  let display = Array.from(text).map(() => chars[Math.floor(Math.random() * chars.length)]);
  el.textContent = display.join('');

  let currentIndex = 0;
  const interval = setInterval(() => {
    if (currentIndex >= text.length) {
      clearInterval(interval);
      hackerEffectMap.delete(el);
      return;
    }
    display[currentIndex] = text[currentIndex];
    el.textContent = display.join('');
    currentIndex++;
  }, delay);

  // アニメーションIDを保存して次回にキャンセル可能に
  hackerEffectMap.set(el, interval);
}


// ================================
// プロジェクト読み込み＆表示更新
// ================================
async function loadProject(id, number) {
  const labelEl = document.querySelector('.project-label');
  const numEl   = document.getElementById('project-number');
  const titleEl = document.getElementById('project-title');
  const descEl  = document.getElementById('project-desc');
  const codeEl  = document.getElementById('source-code');

  // 初期テキストセット
  labelEl.textContent = "Project:";
  numEl.textContent   = number;
  titleEl.textContent = id;
  descEl.textContent  = "// 概要は以下に...";

  try {
   const res  = await fetch(`projects/${id}.txt`);
   const text = res.ok ? await res.text() : `// Error ${res.status}`;

   // すぐに textContent に入れないようにする
   // codeEl.textContent = text; ← これは削除

   // 最初にランダム文字列で見せかけておく（空白でもいい）
   codeEl.textContent = text.replace(/./g, () => {
   const chars = "!@#$%^&*()_+-=[]{}|;:',.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   return chars[Math.floor(Math.random() * chars.length)];
  });

  // 少し待ってからアニメーション開始（描画が落ち着いた後）
  setTimeout(() => {
    hackerEffect(codeEl, text, 2);
  }, 50); // 50ms程度がちょうどよい
} catch (e) {
  codeEl.textContent = `// Fetch error: ${e.message}`;
  }

  // 各要素にハッカー風エフェクトを適用
  hackerEffect(labelEl, "Project:", 50);
  hackerEffect(numEl, number, 50);
  hackerEffect(titleEl, id, 20);
  hackerEffect(descEl, "// 概要は以下に...", 50);
  hackerEffect(codeEl, codeEl.textContent, 2);
}

// ================================
// フェードアウトアニメーション後にプロジェクト読み込み
// ================================
function fadeOutAndLoad(id, number) {
  const mainBlock = document.getElementById('main-block');
  mainBlock.classList.add('fade-out');

  setTimeout(() => {
    loadProject(id, number);
    mainBlock.classList.remove('fade-out');
  }, 500); // 500ms 後に読み込み＆フェードイン
}

// ================================
// 初回表示時の処理
// ================================
window.addEventListener('DOMContentLoaded', () => {
  // コンテナにフェードイン効果付与
  document.querySelector('.container')?.classList.add('fade-in');

  // 最初のプロジェクトリンクを取得し読み込み
  const first = document.querySelector('.project-link');
  if (first) {
    const [num, id] = first.textContent.split(': ');
    first.classList.add('active');  // 選択状態に
    loadProject(first.dataset.id, num);
  }

  // bodyのhiddenクラスを1.5秒後に外す（フェードイン用）
  setTimeout(() => {
    document.body.classList.remove('hidden');
  }, 1500);
});

// ================================
// プロジェクトリンクのクリックイベント設定
// ================================
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // すでにアクティブなリンクなら何もしない
    if (link.classList.contains('active')) return;

    // アクティブ状態を切り替え
    document.querySelectorAll('.project-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const [num, id] = link.textContent.split(': ');
    fadeOutAndLoad(link.dataset.id, num);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".hidden-before-animation");
  if (el) {
    el.style.visibility = "visible";
    // アニメーションをここで実行
    startTypeAnimation(el);
  }
});
