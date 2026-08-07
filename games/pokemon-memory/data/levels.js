// ============================================================
// ポケモン記憶ゲーム — レベル（難易度）設定
// ============================================================
// count    : 1回の問題で並べるポケモンの数
// showTime : 覚える時間（ミリ秒）
// questionsPerSession : 1セッションの問題数
// clearScore : この正解数以上でレベル「クリア」扱いにする
//
// 新しいレベルを追加したいときは、下の配列に1件追加するだけでOKです。
// ============================================================

const LEVELS = [
  { level: 1, count: 3, showTime: 3000, questionsPerSession: 10, clearScore: 7 },
  { level: 2, count: 4, showTime: 3000, questionsPerSession: 10, clearScore: 7 },
  { level: 3, count: 5, showTime: 3000, questionsPerSession: 10, clearScore: 7 },
  { level: 4, count: 5, showTime: 2000, questionsPerSession: 10, clearScore: 7 },
  { level: 5, count: 6, showTime: 2000, questionsPerSession: 10, clearScore: 7 },
];
