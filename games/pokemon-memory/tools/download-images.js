// ============================================================
// ポケモン画像 一括ダウンロードスクリプト（S-GAME / ポケモン記憶ゲーム）
// ============================================================
// 実行方法：
//   1. パソコンに Node.js がインストールされていること（https://nodejs.org/）
//   2. このフォルダで以下を実行する
//        node download-images.js           ← 全地方をまとめて取得
//        node download-images.js kanto     ← カントー地方だけ取得
//        node download-images.js johto     ← ジョウト地方だけ取得
//        node download-images.js all       ← 全地方をまとめて取得（明示指定）
//      引数を省略した場合は all と同じ扱いになります。
//   3. ../../../assets/data/pokemon/pokemon.js に書かれている対象ポケモンの
//      画像を ../../../assets/images/pokemon/<3桁ゼロ埋めの図鑑番号>.png
//      として保存します（例：001.png, 025.png, 151.png, 152.png, 251.png）。
//      すでにファイルがある場合はスキップします（上書きしません）。
//      この画像・データは games/pokemon-quiz（ポケモンクイズ）とも共用です。
//
// 取得先について：
//   既存画像と見た目・サイズを統一するため、official-artworkだけを
//   使用します。取得できない画像は別系統の画像へ切り替えず、失敗として
//   報告します（ゲーム内ではプレースホルダー表示になります）。
//
// 画像の出典・利用について：
//   画像は PokeAPI（https://github.com/PokeAPI/sprites）が公開している
//   画像を取得します。ダウンロードした画像は games/pokemon-memory と
//   games/pokemon-quiz の両方から共用参照されます（重複保存しません）。
//   ポケモンのキャラクターデザイン自体の著作権は 任天堂／ゲームフリーク／
//   クリーチャーズ に帰属します。本プロジェクトの利用は家庭内・個人利用の
//   範囲を想定しています。商用利用や再配布はしないでください。
//
// うまくいかないとき：
//   ・パソコンがインターネットに接続されているか確認してください
//   ・実行結果に表示される「失敗しました」の行と、末尾のエラー内容を
//     そのまま伝えてもらえれば、原因を切り分けやすくなります
//
// 今後ポケモンを追加したいとき：
//   ../../../assets/data/pokemon/pokemon.js に { id, name, types, region, image }
//   を1件追加してから、このスクリプトをもう一度実行するだけでOKです
//   （新規分だけ取得されます）。数百匹に増やしても手順は同じです。
//   追加したポケモンは自動的に games/pokemon-quiz にも反映されます。
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

// pokemon.js は games/pokemon-quiz とも共用している共有データ置き場にある
const DATA_FILE = path.join(__dirname, '..', '..', '..', 'assets', 'data', 'pokemon', 'pokemon.js');
const OUTPUT_DIR = path.join(__dirname, '..', '..', '..', 'assets', 'images', 'pokemon');

const OFFICIAL_ARTWORK_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

function loadPokemonList() {
  const code = fs.readFileSync(DATA_FILE, 'utf8');
  // pokemon.js は "const POKEMON_LIST = [...]" だけの単純なファイルなので、
  // そのまま評価して配列を取り出す。
  const fn = new Function(code + '\nreturn POKEMON_LIST;');
  return fn();
}

// 1本のURLを取得してファイルに保存する。HTTPステータスとエラーを呼び出し元へ返す。
function downloadOnce(url, destPath) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      // リダイレクトを追う
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        res.resume();
        return downloadOnce(res.headers.location, destPath).then(resolve);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return resolve({ ok: false, reason: `HTTP ${res.statusCode}` });
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve({ ok: true })));
      file.on('error', (err) => resolve({ ok: false, reason: err.message }));
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, reason: 'タイムアウト（15秒応答なし）' });
    });
    req.on('error', (err) => {
      resolve({ ok: false, reason: err.message });
    });
  });
}

async function downloadWithFallback(id, destPath) {
  const url = OFFICIAL_ARTWORK_BASE + id + '.png';
  const result = await downloadOnce(url, destPath);
  if (result.ok) return { ok: true, source: 'official-artwork', url };
  if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
  console.log(`  … official-artwork 失敗（${result.reason}）`);
  return { ok: false, reason: result.reason };
}

// コマンドライン引数（kanto / johto / all）で取得対象の地方を絞り込む。
// 省略時は all（全地方）として扱う。
function parseTargetRegion() {
  const arg = (process.argv[2] || 'all').trim().toLowerCase();
  return arg;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const target = parseTargetRegion();
  const fullList = loadPokemonList();
  const list = target === 'all' ? fullList : fullList.filter(p => p.region === target);

  if (list.length === 0) {
    console.log(`指定された地方 "${target}" のポケモンが見つかりませんでした。`);
    console.log('指定できる値: kanto / johto / all（省略時は all）');
    return;
  }

  console.log(`取得対象の地方: ${target}`);
  console.log(`対象ポケモン数: ${list.length}`);
  console.log(`保存先: ${OUTPUT_DIR}`);
  console.log('----------------------------------------');

  let done = 0, skipped = 0, failed = 0;
  const failedList = [];

  for (const p of list) {
    const destPath = path.join(OUTPUT_DIR, p.image);
    if (fs.existsSync(destPath)) {
      skipped++;
      console.log(`スキップ（既にあります）: ${p.image}  (${p.name})`);
      continue;
    }
    console.log(`取得中: ${p.image}  (${p.name}, #${p.id})`);
    const result = await downloadWithFallback(p.id, destPath);
    if (result.ok) {
      done++;
      console.log(`  → 成功（${result.source}）`);
    } else {
      failed++;
      failedList.push(p);
      console.log(`  → 失敗: official-artworkを取得できませんでした`);
    }
  }

  console.log('----------------------------------------');
  console.log(`完了: 新規取得 ${done} 件 / スキップ ${skipped} 件 / 失敗 ${failed} 件`);
  if (failedList.length > 0) {
    console.log('失敗したポケモン:');
    failedList.forEach(p => console.log(`  - #${p.id} ${p.name}`));
    console.log('これらは、ゲーム内ではポケモン名のプレースホルダー表示になります。');
    console.log('（インターネット接続を確認のうえ、もう一度実行すると再取得を試みます）');
  }
}

main();
