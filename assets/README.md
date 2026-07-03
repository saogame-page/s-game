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
- **ゲームで使用するのはこ�