// ============================================================
// サイトワード フラッシュカード — 単語データ
// ============================================================
// ゲーム本体（index.html）とは分けてこのファイルだけで管理しています。
// 単語を追加・編集したいときは、この配列に
//   { en: '英単語', ja: 'にほんごの いみ（ひらがな）', category: 'カテゴリ', order: 表示順 }
// の形で項目を追加・修正するだけでOKです（ゲーム本体の書き換えは不要）。
// 100語以上に増やしても、そのままこの配列に追加していくだけで動作します。
//
// en       : 表面に表示・発音する英単語
// ja       : 裏面に表示する日本語の意味（ひらがな表記が基本）
// category : 'pronoun'（代名詞）/ 'demonstrative'（指示語）/ 'verb'（動詞）/
//            'article'（冠詞）/ 'be-verb'（be動詞）/ 'possessive'（所有格）
//            出題の並べ替え・レベル分けなど、今後の拡張用（未使用でもOK）
// order    : 表示順・難易度の目安（小さいほどやさしい）。
//            将来「かんたん10問」「つぎの10問」のようにレベル分けする際に使えます。
//
// ※ この単語の形（en / ja / category）は、英語3択クイズ（english-picture-quiz）の
//    データ形式と揃えてあります。将来、英語ゲームの中の1モードとして統合する場合も
//    そのまま流用しやすい構造です。
// ------------------------------------------------------------

const SIGHT_WORDS = [
  { en: "I",    ja: "わたし",       category: "pronoun",       order: 1 },
  { en: "you",  ja: "あなた",       category: "pronoun",       order: 2 },
  { en: "we",   ja: "わたしたち",   category: "pronoun",       order: 3 },
  { en: "he",   ja: "かれ",         category: "pronoun",       order: 4 },
  { en: "she",  ja: "かのじょ",     category: "pronoun",       order: 5 },
  { en: "it",   ja: "それ",         category: "pronoun",       order: 6 },
  { en: "this", ja: "これ",         category: "demonstrative", order: 7 },
  { en: "that", ja: "あれ",         category: "demonstrative", order: 8 },
  { en: "can",  ja: "できる",       category: "verb",          order: 9 },
  { en: "like", ja: "すき",         category: "verb",          order: 10 },
  { en: "the",  ja: "その",         category: "article",       order: 11 },
  { en: "a",    ja: "ひとつの",     category: "article",       order: 12 },
  { en: "is",   ja: "です",         category: "be-verb",       order: 13 },
  { en: "am",   ja: "です",         category: "be-verb",       order: 14 },
  { en: "are",  ja: "です",         category: "be-verb",       order: 15 },
  { en: "my",   ja: "わたしの",     category: "possessive",    order: 16 },
  { en: "your", ja: "あなたの",     category: "possessive",    order: 17 },
  { en: "go",   ja: "いく",         category: "verb",          order: 18 },
  { en: "see",  ja: "みる",         category: "verb",          order: 19 },
  { en: "look", ja: "みる",         category: "verb",          order: 20 },
];
