// ============================================================
// 共有 地方（8地方区分）データ ── 都道府県クイズ用
// ============================================================
// S-GAME内の都道府県クイズ系ゲーム（例：games/pokemon-pref-quiz）で
// 共用する「地方」の一覧です。ポケモン系ゲームの regions.js
// （assets/data/pokemon/regions.js）と同じ考え方で、都道府県の
// 地方データだけを別ファイルとして分離しています。
//
// 各項目：
//   key       : 地方の識別キー（英語）。都道府県データファイル名
//               （例: kanto.js）や、都道府県データ内の region と
//               対応させる。
//   label     : 画面表示用の日本語ラベル。
//   total     : その地方に含まれる都道府県の数（47都道府県の内訳）。
//   available : 現在ゲーム内で実際に選択・プレイできるかどうか。
//               その地方の都道府県データ・問題データを追加したら
//               true に変更する。
//
// 新しい地方を追加する手順（例：東北地方）：
//   1. assets/data/prefectures/tohoku.js を作成し、
//      東北6県の { code, name_ja, d } 配列と viewBox を用意する
//      （形状データの作り方は assets/data/prefectures/README.md 参照）
//   2. games/pokemon-pref-quiz/data/questions-tohoku.js のような
//      問題データ（都道府県⇔ポケモンの対応）を追加する
//   3. この配列の tohoku の available を true に変更する
//   4. ゲーム側（index.html）で地方選択時に該当の都道府県データ・
//      問題データを読み込むよう分岐を追加する
// ============================================================

const PREF_REGIONS = [
  { key: "kanto",    label: "関東",     total: 7,  available: true },
  { key: "hokkaido", label: "北海道",   total: 1,  available: false },
  { key: "tohoku",   label: "東北",     total: 6,  available: false },
  { key: "chubu",    label: "中部",     total: 9,  available: false },
  { key: "kinki",    label: "近畿",     total: 7,  available: false },
  { key: "chugoku",  label: "中国",     total: 5,  available: false },
  { key: "shikoku",  label: "四国",     total: 4,  available: false },
  { key: "kyushu",   label: "九州・沖縄", total: 8, available: false },
];
