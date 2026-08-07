// ============================================================
// ポケモン画像 一括ダウンロードスクリプト（S-GAME / ポケモン記憶ゲーム）
// ============================================================
// 実行方法：
//   1. パソコンに Node.js がインストールされていること（https://nodejs.org/）
//   2. このフォルダで以下を実行する
//        node download-images.js
//   3. ../data/pokemon.js に書かれている全ポケモンの画像を
//      ../../../assets/images/pokemon/<3桁ゼロ埋めの図鑑番号>.png として保存します。
//      （例：001.png, 025.png, 151.png）
//      すでにファイルがある場合はスキップします（上書きしません）。
//
// 取得先について：
//   1つの取得先だけに頼ると、新しいポケモン（第9世代など）で
//   画像がまだ用意されていない場合に失敗することがあるため、
//   このスクリプトは複数の候補URLを順番に試します。
//     候補1: official-artwork（一番きれいな公式イラスト）
//     候補2: home（Pokémon HOME用の高画質画像）
//     候補3: 通常のドット風スプライト（ほぼ全ポケモンに存在）
//   どれか1つでも成功すればOKです。実行結果にどの候補で成功したか
//   （またはすべて失敗したか）を表示します。
//
// 画像の出典・利用について：
//   画像は PokeAPI（https://github.com/PokeAPI/sprites）が公開している
//   画像を取得します。既存の games/pokemon-quiz でも同じ画像ソース
//  （official-artwork）を利用しています。
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
//   ../data/pokemon.js に { id, name, types, image } を1件追加してから、
//   このスクリプトをもう一度実行するだけでOKです（新規分だけ取得されます）。
//   数百匹に増やしても手順は同じです。
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, '..', 'data', 'pokemon.js');
const OUTPUT_DIR = path.join(__dirname, '..', '..', '..', 'assets', 'images', 'pokemon');

const SOURCES = [
  {
    label: 'official-artwork',
    base: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
  },
  {
    label: 'home',
    base: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/',
  },
  {
    label: 'default-sprite',
    base: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
  },
];

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
  for (const src of SOURCES) {
    const url = src.base + id + '.png';
    const result = await downloadOnce(url, destPath);
    if (result.ok) return { ok: true, source: src.label, url };
    if (fs.existsSync(destPath)) fs.unlinkSync(destPath); // 失敗分の空/不完全ファイルを掃除
    console.log(`  … ${src.label} 失敗（${result.reason}） → 次の候補を試します`);
  }
  return { ok: false };
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const list = loadPokemonList();
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
      console.log(`  → 失敗: すべての候補で取得できませんでした`);
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
