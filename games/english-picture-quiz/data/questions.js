// ============================================================
// English Picture Quiz — データファイル
// ============================================================
// このファイルには「クイズに出題される単語(WORDS)」と
// 「報酬でもらえるカード図鑑(CARD_DATA)」の2つが入っています。
// この2つは完全に別管理です。クイズに出た単語と、もらえるカードは
// 連動しません（報酬カードは毎回ランダムに1枚選ばれます）。
//
// 今後の追加もここに項目を増やすだけでOK。
// WORDSは1000問以上、CARD_DATAは500枚以上に増やしても
// ゲーム本体のコードは変更不要です。
// ------------------------------------------------------------


// ============================================================
// ① WORDS — クイズに出題される英単語
// ============================================================
// id       : 一意のID
// en       : 英単語（問題として表示・発音に使用）
// ja       : 正しい意味（ひらがな表記が基本）
// category : 'animal' / 'food' / 'vehicle' / 'nature' /
//            'sightword' / 'verb' / 'noun'
//            （出題フィルタなど今後の拡張用。未使用でもOK）
//
// ★選択肢（3択）は手作業で用意する必要はありません。
//   ゲーム側が「正解のja」+「WORDSから自動で選んだ2つの
//   別の意味」を組み合わせて毎回自動生成します。
//   なので、ここに単語を追加するだけで出題が増えます。

const WORDS = [
  // --- どうぶつ ---
  { id: 1,  en: "Dog",    ja: "いぬ",   category: "animal" },
  { id: 2,  en: "Cat",    ja: "ねこ",   category: "animal" },
  { id: 3,  en: "Rabbit", ja: "うさぎ", category: "animal" },
  { id: 4,  en: "Bird",   ja: "とり",   category: "animal" },
  { id: 5,  en: "Fish",   ja: "さかな", category: "animal" },

  // --- たべもの ---
  { id: 6,  en: "Apple",  ja: "りんご",       category: "food" },
  { id: 7,  en: "Banana", ja: "ばなな",       category: "food" },
  { id: 8,  en: "Cake",   ja: "けーき",       category: "food" },
  { id: 9,  en: "Egg",    ja: "たまご",       category: "food" },
  { id: 10, en: "Milk",   ja: "ぎゅうにゅう", category: "food" },

  // --- のりもの ---
  { id: 11, en: "Car",   ja: "くるま",   category: "vehicle" },
  { id: 12, en: "Bus",   ja: "ばす",     category: "vehicle" },
  { id: 13, en: "Train", ja: "でんしゃ", category: "vehicle" },
  { id: 14, en: "Plane", ja: "ひこうき", category: "vehicle" },

  // --- しぜん ---
  { id: 15, en: "Sun",    ja: "たいよう", category: "nature" },
  { id: 16, en: "Moon",   ja: "つき",     category: "nature" },
  { id: 17, en: "Star",   ja: "ほし",     category: "nature" },
  { id: 18, en: "Flower", ja: "はな",     category: "nature" },

  // --- サイトワード ---
  { id: 19, en: "I",    ja: "わたし",       category: "sightword" },
  { id: 20, en: "You",  ja: "あなた",       category: "sightword" },
  { id: 21, en: "We",   ja: "わたしたち",   category: "sightword" },
  { id: 22, en: "See",  ja: "みる",         category: "sightword" },
  { id: 23, en: "Like", ja: "すき",         category: "sightword" },
  { id: 24, en: "Go",   ja: "いく",         category: "sightword" },

  // --- どうし（動詞） ---
  { id: 25, en: "Run",   ja: "はしる", category: "verb" },
  { id: 26, en: "Jump",  ja: "とぶ",   category: "verb" },
  { id: 27, en: "Eat",   ja: "たべる", category: "verb" },
  { id: 28, en: "Sleep", ja: "ねる",   category: "verb" },
  { id: 29, en: "Walk",  ja: "あるく", category: "verb" },
  { id: 30, en: "Swim",  ja: "およぐ", category: "verb" },

  // --- みぢかな めいし ---
  { id: 31, en: "House", ja: "いえ",   category: "noun" },
  { id: 32, en: "Book",  ja: "ほん",   category: "noun" },
  { id: 33, en: "Chair", ja: "いす",   category: "noun" },
  { id: 34, en: "Table", ja: "つくえ", category: "noun" },
  { id: 35, en: "Shoe",  ja: "くつ",   category: "noun" },
  { id: 36, en: "Hat",   ja: "ぼうし", category: "noun" },
];


// ============================================================
// ② CARD_DATA — 報酬カード図鑑
// ============================================================
// クイズの正誤とは無関係に、10問中7問以上正解したときに
// この中からランダムに1枚もらえます（同じカードが重複してもOK。
// その場合は所持数(カウント)が増えます）。
//
// id       : 一意のID（カード番号 No.〇〇〇 に使用）
// en       : カードの英単語
// ja       : 意味（ひらがな表記が基本。固有名詞はカタカナも可）
// category : 'animals' / 'dinosaurs' / 'insects' / 'vehicles' /
//            'yokai' / 'sea' / 'plants' / 'planets'
// image    : 画像ファイルのパス。まだ画像を用意していない場合は
//            null にしておけば、カテゴリごとの絵文字が自動で
//            代わりに表示されます（あとで画像を用意して
//            パスを書けば自動的にその画像に切り替わります。
//            画像の読み込みに失敗した場合も自動で絵文字に
//            フォールバックするので、エラーにはなりません）
// rarity   : 'COMMON' / 'RARE' / 'SUPER RARE'
//            （現在は全てCOMMONですが、値を変えるだけで
//            今後レア度を追加できます）
//
// 各カテゴリ5枚ずつの仮データです。今後カテゴリ追加・カード追加は
// この配列に項目を増やすだけでOKです。

const CARD_DATA = [
  // --- どうぶつ ---
  { id: 1,  en: "Lion",     ja: "らいおん", category: "animals", image: null, rarity: "COMMON" },
  { id: 2,  en: "Elephant", ja: "ぞう",     category: "animals", image: null, rarity: "COMMON" },
  { id: 3,  en: "Panda",    ja: "ぱんだ",   category: "animals", image: null, rarity: "COMMON" },
  { id: 4,  en: "Tiger",    ja: "とら",     category: "animals", image: null, rarity: "COMMON" },
  { id: 5,  en: "Giraffe",  ja: "きりん",   category: "animals", image: null, rarity: "COMMON" },

  // --- きょうりゅう ---
  { id: 6,  en: "T-Rex",         ja: "ティラノサウルス", category: "dinosaurs", image: null, rarity: "COMMON" },
  { id: 7,  en: "Triceratops",   ja: "トリケラトプス",   category: "dinosaurs", image: null, rarity: "COMMON" },
  { id: 8,  en: "Stegosaurus",   ja: "ステゴサウルス",   category: "dinosaurs", image: null, rarity: "COMMON" },
  { id: 9,  en: "Pteranodon",    ja: "プテラノドン",     category: "dinosaurs", image: null, rarity: "COMMON" },
  { id: 10, en: "Brachiosaurus", ja: "ブラキオサウルス", category: "dinosaurs", image: null, rarity: "COMMON" },

  // --- こんちゅう ---
  { id: 11, en: "Ant",       ja: "あり",       category: "insects", image: null, rarity: "COMMON" },
  { id: 12, en: "Bee",       ja: "はち",       category: "insects", image: null, rarity: "COMMON" },
  { id: 13, en: "Butterfly", ja: "ちょう",     category: "insects", image: null, rarity: "COMMON" },
  { id: 14, en: "Beetle",    ja: "かぶとむし", category: "insects", image: null, rarity: "COMMON" },
  { id: 15, en: "Dragonfly", ja: "とんぼ",     category: "insects", image: null, rarity: "COMMON" },

  // --- のりもの ---
  { id: 16, en: "Car",      ja: "くるま",   category: "vehicles", image: null, rarity: "COMMON" },
  { id: 17, en: "Bus",      ja: "ばす",     category: "vehicles", image: null, rarity: "COMMON" },
  { id: 18, en: "Train",    ja: "でんしゃ", category: "vehicles", image: null, rarity: "COMMON" },
  { id: 19, en: "Airplane", ja: "ひこうき", category: "vehicles", image: null, rarity: "COMMON" },
  { id: 20, en: "Ship",     ja: "ふね",     category: "vehicles", image: null, rarity: "COMMON" },

  // --- にほんのようかい ---
  { id: 21, en: "Kappa",     ja: "かっぱ",     category: "yokai", image: null, rarity: "COMMON" },
  { id: 22, en: "Tengu",     ja: "てんぐ",     category: "yokai", image: null, rarity: "COMMON" },
  { id: 23, en: "Oni",       ja: "おに",       category: "yokai", image: null, rarity: "COMMON" },
  { id: 24, en: "Kitsune",   ja: "きつね",     category: "yokai", image: null, rarity: "COMMON" },
  { id: 25, en: "Yuki-onna", ja: "ゆきおんな", category: "yokai", image: null, rarity: "COMMON" },

  // --- うみのいきもの ---
  { id: 26, en: "Dolphin", ja: "いるか", category: "sea", image: null, rarity: "COMMON" },
  { id: 27, en: "Octopus", ja: "たこ",   category: "sea", image: null, rarity: "COMMON" },
  { id: 28, en: "Crab",    ja: "かに",   category: "sea", image: null, rarity: "COMMON" },
  { id: 29, en: "Whale",   ja: "くじら", category: "sea", image: null, rarity: "COMMON" },
  { id: 30, en: "Turtle",  ja: "かめ",   category: "sea", image: null, rarity: "COMMON" },

  // --- そうか（草花） ---
  { id: 31, en: "Sunflower",     ja: "ひまわり",     category: "plants", image: null, rarity: "COMMON" },
  { id: 32, en: "Tulip",         ja: "ちゅーりっぷ", category: "plants", image: null, rarity: "COMMON" },
  { id: 33, en: "Rose",          ja: "ばら",         category: "plants", image: null, rarity: "COMMON" },
  { id: 34, en: "Cherry Blossom",ja: "さくら",       category: "plants", image: null, rarity: "COMMON" },
  { id: 35, en: "Sprout",        ja: "め",           category: "plants", image: null, rarity: "COMMON" },

  // --- わくせい・うちゅう ---
  { id: 36, en: "Mars",   ja: "かせい",   category: "planets", image: null, rarity: "COMMON" },
  { id: 37, en: "Jupiter",ja: "もくせい", category: "planets", image: null, rarity: "COMMON" },
  { id: 38, en: "Saturn", ja: "どせい",   category: "planets", image: null, rarity: "COMMON" },
  { id: 39, en: "Moon",   ja: "つき",     category: "planets", image: null, rarity: "COMMON" },
  { id: 40, en: "Rocket", ja: "ろけっと", category: "planets", image: null, rarity: "COMMON" },
];


// ============================================================
// ③ カテゴリの表示名・絵文字（画像が無いときの代用表示に使用）
// ============================================================
// 新しいカテゴリを追加する場合は、この2つのオブジェクトにも
// 1行ずつ追加してください。

const CARD_CATEGORY_LABELS = {
  animals:   "動物",
  dinosaurs: "恐竜",
  insects:   "昆虫",
  vehicles:  "乗り物",
  yokai:     "日本の妖怪",
  sea:       "海の生き物",
  plants:    "草花",
  planets:   "惑星・宇宙",
};

const CARD_CATEGORY_ICONS = {
  animals:   "🐾",
  dinosaurs: "🦕",
  insects:   "🐛",
  vehicles:  "🚗",
  yokai:     "👹",
  sea:       "🐠",
  plants:    "🌸",
  planets:   "🪐",
};

// カテゴリの表示順（ここに書いた順でコレクション画面に並びます）
const CARD_CATEGORY_ORDER = [
  "animals", "dinosaurs", "insects", "vehicles",
  "yokai", "sea", "plants", "planets",
];
