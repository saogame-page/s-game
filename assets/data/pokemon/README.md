# assets/data/pokemon/

ポケモン関連の共有データ置き場です。以下のゲームから共用参照されています。

- `games/pokemon-memory`（ポケモン記憶ゲーム）
- `games/pokemon-quiz`（ポケモンクイズ）

## ファイル

- `pokemon.js` — `POKEMON_LIST`（カントー地方151匹＋ジョウト地方100匹。`id`/`name`/`types`/`region`/`image`。
  `region` は `"kanto"` / `"johto"` のような英語の識別キー）
- `pokemon-paldea.js` — 将来用のパルデア地方参考データ20匹。現在のゲームからは読み込まず、
  `POKEMON_LIST` にも含めません。
- `regions.js` — `REGIONS`（今後追加予定の地方一覧。`key`（英語の識別キー）・`label`（日本語表示名）・
  総数・実装済みかどうか）

正式対応中のポケモンを追加・修正したい場合は、`pokemon.js` と `regions.js` を編集してください。
両方のゲームに自動的に反映されます。

画像は `assets/images/pokemon/` を参照してください（こちらも共用、重複保存なし）。
画像の取得方法は `games/pokemon-memory/tools/README.md` を参照してください。

このゲーム専用のデータ（記憶ゲームの難易度設定 `levels.js` や進化データ
`evolutions.js` など）は、今まで通り `games/pokemon-memory/data/` に置いたままです。
