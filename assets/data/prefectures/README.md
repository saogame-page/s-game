# assets/data/prefectures/

都道府県クイズ系ゲーム（`games/pokemon-pref-quiz` など）で使う、都道府県の
地図（形状）データの置き場です。`assets/data/pokemon/`（ポケモン共有データ）
と同じ考え方で、地方ごとにファイルを分けて管理しています。

## ファイル構成

- `regions.js` — `PREF_REGIONS`。8地方区分（関東・北海道・東北・中部・近畿・
  中国・四国・九州沖縄）の一覧と、実装済みかどうかのフラグ。
- `kanto.js` — `PREFECTURE_SHAPES_KANTO`。関東7都県（茨城・栃木・群馬・埼玉・
  千葉・東京・神奈川）の実装済みデータ（`viewBox` と各県の `{code, name_ja,
  name_hiragana, d}`）。
- 今後、他の地方を追加する際は `hokkaido.js` / `tohoku.js` のように
  1地方＝1ファイルで追加していきます。

## データの内容と出典

各都道府県の `d` は、実際の行政境界（都道府県の輪郭）に基づく座標を
SVGの `<path d="...">` 形式に変換したものです。図形を大きく簡略化した
模式図ではなく、実測の地理データをもとにした形・位置関係を保っています。

- 出典: **amCharts geodata**（`japanLow` データセット）
  https://github.com/amcharts/amcharts4-geodata
  © amCharts / Antanas Marcelionis
  ライセンス: **Free amCharts linkware license**（利用にあたり出典表示が必要）
- 取得方法: 上記データを `unpkg.com`（正規のnpmパッケージ配信CDN。
  プロキシ／スクレイピングサービスは使用していません）経由で直接取得し、
  本プロジェクト内にローカル保存したものです。ゲーム実行時にこのファイルを
  外部から取得することはなく、常にこのローカルファイルだけを参照します。
- 加工内容: 本土の主要部のみを抽出（一部の小さな離島は除外）し、
  簡易正距円筒図法（equirectangular projection、基準緯度
  lat0 ≒ 36.02455°）で7都県共通のパラメータを使って投影しています。
  同じ投影・同じ縮尺で変換しているため、7都県間の相対的な位置関係
  （例：東京都は埼玉・千葉・神奈川に囲まれている）はそのまま保たれています。

補足: 当初は `dataofjapan/land`（地球地図日本 / 国土地理院データがベース、
GFDLライセンス）の利用を検討しましたが、データが非常に大きく、この開発
環境のツールでは全量を取得できなかったため、上記のamCharts由来データに
切り替えました。もし将来的に `dataofjapan/land` などの別データに置き換える
場合も、外部プロキシは使わず、直接取得できるファイルを一度ローカル保存
してから使う、という同じ方針にしてください。

## 不具合修正履歴

**2026-08-12: 埼玉県がクリックできない不具合を修正**

関東都道府県クイズで埼玉県だけ地図上でクリック判定されず、該当エリアが
白く抜けて見える不具合が発生しました。調査の結果、以前のデータ生成時に
埼玉県のポリゴン座標だけが誤って別の場所を指すデータになっており（隣接
県と地理的に整合しない、実際の埼玉県の位置と異なる形状だった）、地図上
に正しく描画・配置されていなかったことが原因と判明しました。

修正では、出典元（amCharts `japanLow.json`）から関東7都県の生データを
都道府県ID（`JP-08`〜`JP-14`）で再取得し、7都県すべてを同じ投影パラメータ
（equirectangular, lat0=36.02455）で再計算して`kanto.js`を再生成しました。
1県だけをパッチ的に直すのではなく7県全体を作り直したのは、投影パラメータの
微妙なズレによる将来的な不整合を防ぐためです。

修正後、以下をNode.jsスクリプトで検証済みです。

- 隣接する都県どうしの境界座標が正確に一致すること（誤差0px。例：埼玉県は
  茨城・栃木・群馬・千葉・東京の5都県と境界を共有しており、いずれも
  ぴったり一致）
- 各都県の重心（ポリゴンの面積重心）が、自分自身のポリゴン内にのみ含まれ、
  他の都県のポリゴンには含まれないこと（7都県全て確認）
- `viewBox`が `0 0 820 850` から `0 0 750 840` に変わっていますが、SVGは
  `viewBox`基準で自動スケールされるため、地図の見た目のサイズやデザインは
  変わりません（座標の精度が上がった分、全体のバウンディングボックスが
  わずかに変化しただけです）

## 使い方（ゲーム側）

```html
<script src="../../assets/data/prefectures/regions.js"></script>
<script src="../../assets/data/prefectures/kanto.js"></script>
<script>
  // PREF_REGIONS, PREFECTURE_SHAPES_KANTO がそのまま使えます
  PREFECTURE_SHAPES_KANTO.prefectures.forEach(pref => {
    // pref.code / pref.name_ja / pref.name_hiragana / pref.d
  });
</script>
```

## 今後、地方を追加する手順（例：東北地方）

1. `assets/data/prefectures/tohoku.js` を作成し、東北6県の
   `{code, name_ja, name_hiragana, d}` 配列と共通の `viewBox` を用意する
   （kanto.js と同じ形式。可能であれば同じ投影パラメータを使うと、
   将来「関東＋東北」のような広域地図も作りやすくなります）。
2. `games/pokemon-pref-quiz/data/questions-tohoku.js` のような、
   その地方向けの問題データ（都道府県⇔ポケモンの対応）を追加する。
3. `regions.js` の該当地方の `available` を `true` に変更する。
4. ゲーム側（`games/pokemon-pref-quiz/index.html`）で、地方選択時に
   該当の都道府県データ・問題データを読み込むよう分岐を追加する。

画像（ポケモン）は追加不要です。都道府県クイズは既存の
`assets/images/pokemon/` と `assets/data/pokemon/pokemon.js` をそのまま
再利用します。
