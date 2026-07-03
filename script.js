// ============================================================
// ちびっこミニゲームランド — トップページ JS
// ============================================================

// カードのクリックを <a> 全体で受け取るのでJSは最小限
// 将来的にゲームデータをここで管理する場合の骨格

const games = [
  {
    id: "animal-quiz",
    title: "どうぶつ3択クイズ",
    emoji: "🐾",
    tag: "クイズ ・ 3〜6さい",
    desc: "どうぶつのなまえをあてよう！たのしい3たくクイズだよ🎉",
    url: "games/animal-quiz/index.html",
    available: true,
  },
  // 新しいゲームはここに追加
];

// ページ読み込み時のふわっとアニメ
document.querySelectorAll(".game-card").forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(24px)";
  card.style.transition = `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`;
  requestAnimationFrame(() => {
    card.style.opacity = "";
    card.style.transform = "";
  });
});
