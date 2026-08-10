// ============================================================
// 共有 地方（リージョン）データ
// ============================================================
// pokemon.js と同じく、複数のポケモン系ゲームで共用しています。
//   ・games/pokemon-memory/index.html（ポケモン記憶ゲーム）
//   ・games/pokemon-quiz/index.html（ポケモンクイズ）
//
// pokemon.js の各ポケモンが持つ region フィールドの値と、
// この配列の key は完全に一致させてください（例："kanto"）。
// key は英語の識別キー、label は画面表示用の日本語ラベルです。
//
// 各項目：
//   key       : pokemon.js の region フィールドと対応させる識別名（英語）
//   label     : 画面表示用の日本語ラベル
//   total     : その地方の本来のポケモン総数（公式の地方図鑑数）。
//               まだ pokemon.js にデータが無い地方でも、
//               「0 / 100」のように進捗表示するために使います。
//   available : 現在ゲーム内で実際に選択・プレイできるかどうか。
//               データを追加したら true に変更してください。
//
// 新しい地方を追加する手順：
//   1. pokemon.js に、その地方の region: "◯◯"（英語キー）を持つ
//      ポケモンを追加
//   2. この配列の該当する地方の available を true に変更
//   （total は最初から正しい値を入れてあるので変更不要）
//   3. 各ゲーム側（記憶ゲーム／クイズ）で、その地方を出題対象に
//      含めるかどうかの表示・選択ロジックを必要に応じて調整する
// ============================================================

const REGIONS = [
  { key: "kanto", label: "カントー", total: 151, available: true },
  { key: "johto", label: "ジョウト", total: 100, available: true },
  { key: "hoenn", label: "ホウエン", total: 135, available: false },
  { key: "sinnoh", label: "シンオウ", total: 107, available: false },
  { key: "unova", label: "イッシュ", total: 156, available: false },
  { key: "kalos", label: "カロス", total: 72, available: false },
  { key: "alola", label: "アローラ", total: 88, available: false },
  { key: "galar", label: "ガラル", total: 96, available: false },
  { key: "paldea", label: "パルデア", total: 120, available: false },
];
