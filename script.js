// ================================
// ハッカー風スクランブルエフェクト（高速版）
// ================================

const hackerEffectMap = new WeakMap();

function hackerEffect(el, text, duration = 1000) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const totalFrames = Math.max(1, Math.floor(duration / (1000 / 60))); // 60FPSベース
  const charsPerFrame = text.length / totalFrames;

  const prevAnimation = hackerEffectMap.get(el);
  if (prevAnimation) cancelAnimationFrame(prevAnimation);

  let frame = 0;
  let progress = 0;
  let rafId;

  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function update() {
    let output = '';
    for (let i = 0; i < text.length; i++) {
      output += i < Math.floor(progress) ? text[i] : randomChar();
    }

    el.textContent = output;

    if (progress < text.length) {
      progress += charsPerFrame;
      rafId = requestAnimationFrame(update);
      hackerEffectMap.set(el, rafId);
    } else {
      el.textContent = text;
      hackerEffectMap.delete(el);
    }
  }

  update();
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
  // projectsフォルダからテキストを取得（ここを修正）
  const res  = await fetch(`projects/${id}.txt`);
  const text = res.ok ? await res.text() : `// Error ${res.status}`;
  codeEl.textContent = text;
} catch (e) {
  codeEl.textContent = `// Fetch error: ${e.message}`;
}

  // 各要素にハッカー風エフェクトを適用
  hackerEffect(labelEl, "Project:", 300);
  hackerEffect(numEl, number, 300);
  hackerEffect(titleEl, id, 500);
  hackerEffect(descEl, "// 概要は以下に...", 400);
  hackerEffect(codeEl, codeEl.textContent, codeEl.textContent.length * 7);
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
// （略：hackerEffect, loadProject, fadeOutAndLoad はそのまま）

window.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニュー開閉
  const menuBtn = document.getElementById('menu-toggle');
  menuBtn.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  // プロジェクト／Infoリンク共通のクリック処理
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      if (link.classList.contains('active')) return;

      // メニューを閉じる
      document.body.classList.remove('menu-open');

      // アクティブ切り替え
      document.querySelectorAll('.project-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const id = link.dataset.id;
      const num = link.textContent.split(':')[0];

      if (id === 'information') {
        // 青枠の about-me 情報をメインに表示
        const info = document.querySelector('.sidebar-left .info-block').innerText;
        document.querySelector('.project-label').textContent = '';
        document.getElementById('project-number').textContent = '';
        document.getElementById('project-title').textContent = 'About Me';
        document.getElementById('project-desc').textContent = '';
        document.getElementById('source-code').textContent = info;
      } else {
        // 通常のプロジェクト読み込み
        fadeOutAndLoad(id, num);
      }
    });
  });

  // 初回ロード
  const first = document.querySelector('.project-link');
  if (first) {
    first.classList.add('active');
    const [num, id] = first.textContent.split(': ');
    loadProject(first.dataset.id, num);
  }

  // フェードイン解除
  setTimeout(() => document.body.classList.remove('hidden'), 1500);
});
