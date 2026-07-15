# Assets 素材管理ルール

## フォルダ構成

```
assets/
├── raw-assets/         # 元素材（加工前の原本）
│   ├── inbox/          # ★新規素材の一時置き場（仕分け前はここ）
│   ├── planets/        # 惑星スプライトシートなど
│   ├── animals/
│   ├── dinosaurs/
│   ├── ui/
│   ├── backgrounds/
│   ├── logos/
│   ├── sounds/
│   ├── music/
│   └── fonts/
├── images/             # 加工済み画像（ゲームで使用）
│   ├── planets/
│   ├── animals/
│   ├── dinosaurs/
│   ├── ui/
│   └── backgrounds/
├── audio/              # 加工済み音声（ゲームで使用）
└── videos/             # 動画素材
```

## ルール

### raw-assets/inbox/
- Geminiなどで**新しく生成・保存した画像は、種類（動物・惑星・背景など）を問わず、まずすべてここに入れる**
- 内容確認・仕分けが終わるまでの一時置き場。ゲームからは絶対に参照しない
- 仕分けが終わったファイルはここに残さず、対応フォルダへ移動する

### raw-assets/（inbox以外）
- **元画像・元素材を保存する場所**
- **絶対に編集・削除・上書きしない**
- inbox から仕分けられたファイルが、動物なら `animals/`、惑星なら `planets/` のように対応フォルダに置かれる

### images/ / audio/ / videos/
- **ゲームで使用するのはここのファイルのみ**
- raw-assets/ からコピーして加工（リサイズ・切り抜き・背景透過など）したものを置く
- 元ファイルは raw-assets/ に残したまま作業する

## 新規素材の取り込みフロー（inbox運用ルール）

1. **inbox に新しい画像が入る**（Geminiなどでの生成・保存はまずここへ）
2. **画像内容を確認する**（何が写っているか、透かしや不要な背景がないか等）
3. **適切なフォルダへ移動する**（`animals/` `planets/` `backgrounds/` など内容に応じて）
4. **命名規則に従ってリネームする**
   例：`sai-real.png` / `inu-real.png` / `mars-real.png`（ローマ字の対象名 + `-real` + 拡張子）
5. **images フォルダで使う場合は、必要に応じて加工してから配置する**
   （背景透過・サイズ・形式などをゲームで使える状態に整える）
6. **同名ファイルが既にある場合は、勝手に上書きせず必ず確認する**

## 作業フロー（raw-assets → images）

```
raw-assets/planets/planets-sheet.png   ← 元素材（触らない）
        ↓ コピーして加工
images/planets/mars.png                ← ゲームで使用
```

1. `raw-assets/` から対象ファイルをコピー
2. `images/` 以下で加工・編集
3. ゲームは `images/` 以下のファイルを参照する
