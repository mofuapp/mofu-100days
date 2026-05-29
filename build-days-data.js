#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const INDEX_PATH = path.join(ROOT, 'index.html');
const OUTPUT_PATH = path.join(ROOT, 'days-data.js');

function parseDaysMeta() {
  if (fs.existsSync(OUTPUT_PATH)) {
    const js = fs.readFileSync(OUTPUT_PATH, 'utf8');
    const json = js.replace(/^window\.COURSE_DAYS\s*=\s*/, '').trim().replace(/;\s*$/, '');
    const days = JSON.parse(json);
    if (days.length === 100) return days.map(({ d, t, b }) => ({ d, t, b }));
  }
  const html = fs.readFileSync(INDEX_PATH, 'utf8');
  const m = html.match(/const DAYS=\[([\s\S]*?)\];/);
  if (!m) throw new Error('Day metadata not found. Run from existing days-data.js or restore DAYS in index.html');
  // eslint-disable-next-line no-eval
  const days = eval('[' + m[1] + ']');
  if (days.length !== 100) throw new Error(`Expected 100 days, got ${days.length}`);
  return days;
}

function opening(day, title) {
  return `【オープニング】\nこんにちは、もふスタ100日チャレンジ Day${day} です。今日は「${title}」を一緒にやっていきます。画面を見ながら、言われた通りにコピペするだけでOK。考えず、やるだけで進めましょう。`;
}

function closing(day) {
  return `【クロージング】\n以上、Day${day} の内容です。今日の宿題を必ずやってください。分からないところはDiscordで質問OK。明日も同じ時間に会いましょう。`;
}

function scriptBlock(openingText, body, closingText) {
  return `${openingText}\n\n${body}\n\n${closingText}`;
}

// ─── Day-specific content configs ───────────────────────────────────────────

const CHATGPT_DAYS = {
  1: {
    time: '6〜8分',
    prep: ['PCまたはスマホ', 'メールアドレス', 'クレジットカード（ChatGPT Plus用）', 'Discordアカウント', 'MOSHアカウント'],
    main: `【本編】
まず100日のゴールを確認します。100日後には、AIでイラストを作り、SNSで発信し、フォロワー100人を目指します。今日やることは3つだけです。

① ChatGPTを開きます。chatgpt.com にアクセスし、「Sign up」からアカウント作成。メール認証まで完了させてください。

② 左下のプランを確認。「Upgrade to Plus」を押し、月20ドルの有料プランに加入します。画像生成にはPlusが必要です。加入後、画面上部に「GPT-4o」が選べることを確認。

③ DiscordとMOSHを準備。Discordは discord.com でアカウント作成し、もふスタの招待リンクからサーバーに参加。MOSHは受講生ポータルのURLからログインし、Day1の動画が見られることを確認。

最後に、ChatGPTの新規チャットを開き、以下をそのまま送信してください：
「こんにちは。100日チャレンジのDay1です。これからイラスト制作を一緒に頑張ります。」
返事が来たら準備完了です。`,
    demo: ['chatgpt.com を開く', 'Sign up → メール認証', 'Upgrade to Plus を実行', 'GPT-4o が選べるか確認', 'Discord招待リンクから参加', 'MOSHにログイン', 'ChatGPTでテストメッセージ送信'],
    mosh: '100日チャレンジの全体像と、ChatGPT・Discord・MOSHの初期設定を一緒に完了します。Day1から「考えずやるだけ」で環境を整えましょう。',
    homework: 'ChatGPT Plus加入・Discord参加・MOSHログインの3点が全部OKかスクショを撮り、Discordの #day1-report に投稿してください。'
  },
  2: {
    time: '5〜7分',
    prep: ['ChatGPT Plus（ログイン済み）', 'メモ帳アプリ', '画像保存フォルダ'],
    main: `【本編】
ChatGPTを開き、新規チャットを作成します。モデルは「GPT-4o」を選択。

以下のプロンプトをそのままコピーして送信してください：
「かわいい女の子のイラストを1枚描いて。パステルカラー、全身、白背景、ゆるいアニメ調。」

30秒ほど待つと画像が生成されます。気に入ったら画像をクリックし、右上のダウンロードボタンで保存。ファイル名は「day02_かわいい女の子.png」にしてください。

もう1枚、言葉を少し変えて試します：
「かわいい女の子のイラスト。ボブヘア、ピンクの服、笑顔、全身、白背景。」
2枚並べて、どちらが好みかメモ帳に1行書いておきましょう。

保存場所は「mofu100days/day02/」フォルダを作ってそこに入れてください。`,
    demo: ['ChatGPT新規チャット作成', 'GPT-4o を選択', 'プロンプト1をコピペ送信', '生成画像をダウンロード', 'プロンプト2を送信', '2枚を比較してメモ', 'フォルダに保存'],
    mosh: 'プロンプト1行で最初のイラストを生成する体験。コピペするだけでAIイラストが作れることを実感するDay2です。',
    homework: '今日作った2枚のうち好きな方をDiscord #day2-share に投稿し、好きな理由を1行添えてください。'
  },
  3: {
    time: '5〜7分',
    prep: ['Day2で作った画像', 'ChatGPT（同じチャット可）', 'メモ帳'],
    main: `【本編】
Day2のチャットを開くか、Day2の画像をChatGPTに再度アップロードします。

修正は「会話」です。以下を順番に送ってください。

1回目：
「髪色を水色に変えて。他はそのまま。」

2回目：
「目をもっと大きく、キラキラした瞳にして。」

3回目：
「背景を桜の公園に変えて。キャラはそのまま。」

各修正後、気に入った版をダウンロード。ファイル名は day03_v1.png、day03_v2.png、day03_v3.png と付けます。

メモ帳に「何を言ったらどう変わったか」を3行で書きます。例：「髪色→全体の印象が涼しげに」「目→よりかわいく」「背景→春らしい雰囲気に」。`,
    demo: ['Day2のチャットまたは画像を開く', '修正プロンプト1を送信', 'v1を保存', '修正プロンプト2を送信', 'v2を保存', '修正プロンプト3を送信', 'v3を保存してメモ'],
    mosh: 'AIへの指示＝会話の感覚を体得。前日の画像を日本語で修正する基本操作を、3ステップでマスターします。',
    homework: '3バージョンのうちベスト1枚と、修正で変えた3ポイントをDiscord #day3-share に投稿してください。'
  },
  4: {
    time: '6〜8分',
    prep: ['ChatGPT', 'メモ帳（テンプレ用）', 'Day3のメモ'],
    main: `【本編】
今日は5要素プロンプトの型を作ります。5つは「誰・何を・雰囲気・構図・画風」です。

メモ帳に以下のテンプレをコピーしてください：
---
【5要素テンプレ】
誰：＿＿＿＿
何を：＿＿＿＿
雰囲気：＿＿＿＿
構図：＿＿＿＿
画風：＿＿＿＿
---

穴埋め例：
誰：10代の女の子、ショートヘア
何を：花束を両手で持っている
雰囲気：春らしく明るい、パステル
構図：全身、やや斜め
画風：ゆるいアニメ調、線画は細め

これを1文にまとめてChatGPTに送ります：
「10代の女の子、ショートヘア。花束を両手で持っている。春らしく明るいパステルカラー。全身、やや斜め構図。ゆるいアニメ調、細い線画。白背景。」

生成後、1要素ずつ変えて比較。例えば「構図：バストアップ」だけ変えて再生成。5要素テンプレは今後ずっと使うので、メモ帳のピン留め推奨です。`,
    demo: ['5要素テンプレをメモにコピー', '穴埋めを入力', '1文プロンプトに変換', 'ChatGPTに送信', '生成画像を保存', '構図だけ変えて再生成', 'テンプレをピン留め'],
    mosh: '誰・何を・雰囲気・構図・画風の5要素でプロンプトの型を作る。再現性の高い指示の書き方を身につけます。',
    homework: '自分の5要素テンプレ（穴埋め済み）と生成した1枚をDiscord #day4-share に投稿してください。'
  },
  5: {
    time: '6〜8分',
    prep: ['ChatGPT', '5要素テンプレ', 'メモ帳（好みメモ用）'],
    main: `【本編】
3テーマで1枚ずつ作り、自分の好みを探します。

■テーマ1：かわいい系
「ふわふわのパステルカラーの女の子。うさぎのぬいぐるみを抱えている。にっこり笑顔。全身、白背景。ゆるいアニメ調、丸い目。」

■テーマ2：大人っぽい系
「20代の女性。落ち着いたネイビーのワンピース。カフェで本を読んでいる。シックで大人っぽい雰囲気。バストアップ。リアル寄りのアニメ調。」

■テーマ3：ファンタジー系
「魔法使いの少女。星が散る夜空、浮かぶ本。神秘的で幻想的。全身、ロングショット。ファンタジーアニメ調、光のエフェクト。」

各1枚、計3枚保存。ファイル名：day05_cute.png / day05_adult.png / day05_fantasy.png

好みメモを書きます：
「一番好き：＿＿＿ 理由：＿＿＿」
「次点：＿＿＿ 理由：＿＿＿」
「苦手：＿＿＿ 理由：＿＿＿」`,
    demo: ['かわいい系プロンプト送信', '1枚目を保存', '大人っぽい系プロンプト送信', '2枚目を保存', 'ファンタジー系プロンプト送信', '3枚目を保存', '好みメモを記入'],
    mosh: 'かわいい・大人っぽい・ファンタジーの3テーマで1枚ずつ生成し、自分の好みの方向性を見つけるDay5です。',
    homework: '3枚並べたスクショと好みメモをDiscord #day5-share に投稿してください。'
  },
  6: {
    time: '6〜8分',
    prep: ['Day5で一番好きだった画像', 'ChatGPT', 'Before/After記録シート（メモ帳）'],
    main: `【本編】
Day5のベスト1枚を選び、3回修正してクオリティを上げます。

Before：修正前の画像を day06_before.png で保存。

修正1回目（例）：
「服の色をラベンダーに変更。背景に小さな星を散らして。」
→ day06_v1.png 保存。メモ：「服色変更＋星追加→より幻想的に」

修正2回目（例）：
「表情をもう少し照れ笑いに。頬に薄いピンク。」
→ day06_v2.png 保存。メモ：「照れ表情→親しみやすさUP」

修正3回目（例）：
「髪にリボンを追加。全体の色味を少し明るく。」
→ day06_after.png 保存。メモ：「リボン＋明度UP→完成度向上」

Before/Afterを並べて、3行の変更ログを完成させます。`,
    demo: ['ベスト1枚を選定', 'Before保存', '修正1→保存→メモ', '修正2→保存→メモ', '修正3→After保存→メモ', 'Before/After並べて確認'],
    mosh: '気に入った1枚を3回修正し、何を変えたらどう変わったかを記録。Before/Afterでクオリティ向上の感覚を掴みます。',
    homework: 'Before/Afterの並べ画像と変更ログ3行をDiscord #day6-share に投稿してください。'
  },
  7: {
    time: '5〜7分',
    prep: ['Day1〜6の作品フォルダ', 'メモ帳', 'Week1振り返りシート'],
    main: `【本編】
Week1振り返りです。考えず、ワークシートに答えるだけ。

■ベスト3選定
Day1〜6の作品から好きな3枚を選び、ファイル名と選んだ理由を書きます。

■振り返りワーク（メモ帳にコピー）
1. 今週いちばん楽しかったこと：
2. プロンプトでうまくいった言い回し：
3. うまくいかなかったことと原因：
4. 来週やりたいこと（1つ）：

■来週の目標（1行）
例：「5要素テンプレを使いこなして、髪型・表情を自由に指定できるようにする」

Discord #week1-review にベスト3の画像とワーク回答を投稿してください。`,
    demo: ['Day1-6フォルダを開く', 'ベスト3を選定', '選んだ理由を3行記入', '振り返りワーク4問に回答', '来週目標を1行で設定', 'Discordに投稿'],
    mosh: 'Week1振り返り。ベスト3選定と好きな理由の言語化、来週の目標設定まで一緒にやります。',
    homework: '振り返りワーク4問への回答とベスト3画像をDiscord #week1-review に必ず投稿してください。'
  }
};

// Generate remaining days programmatically with specific prompts
function getDayContent(d, title, brief) {
  if (CHATGPT_DAYS[d]) {
    const c = CHATGPT_DAYS[d];
    return {
      time: c.time,
      prep: c.prep,
      script: scriptBlock(opening(d, title), c.main, closing(d)),
      demo: c.demo,
      mosh: c.mosh,
      homework: c.homework
    };
  }
  return generateByPhase(d, title, brief);
}

function mk(d, title, time, prep, main, demo, mosh, homework) {
  return { time, prep, script: scriptBlock(opening(d, title), main, closing(d)), demo, mosh, homework };
}

function generateByPhase(d, title, brief) {
  const { genPromptBasics, genMidjourney, genSNS, genFollowerSprint } = require('./_generators');
  if (d >= 8 && d <= 25) return genPromptBasics(d, title, brief, mk);
  if (d >= 26 && d <= 50) return genMidjourney(d, title, brief, mk);
  if (d >= 51 && d <= 75) return genSNS(d, title, brief, mk);
  return genFollowerSprint(d, title, brief, mk);
}

function normalizeList(arr, min, max, padFn) {
  const list = [...arr];
  while (list.length < min) list.push(padFn(list.length));
  return list.slice(0, max);
}

function padPrep(i) {
  return ['PCまたはスマホ', 'メモ帳', '作品保存フォルダ', 'Discord', 'SNSアプリ'][i] || 'メモ帳';
}

function padDemo(i) {
  return ['画面共有開始', '手順を確認', '操作を実行', '結果を保存', 'Discordに報告', '振り返りメモ', '次の準備確認', '完了チェック'][i] || '完了確認';
}

function normalizeEntry(entry) {
  entry.prep = normalizeList(entry.prep, 3, 5, padPrep);
  entry.demo = normalizeList(entry.demo, 5, 8, padDemo);
  return entry;
}

function buildAllDays(metaDays) {
  return metaDays.map(({ d, t, b }) => {
    const content = getDayContent(d, t, b);
    return normalizeEntry({ d, t, b, ...content });
  });
}

function formatOutput(days) {
  const json = JSON.stringify(days, null, 2);
  return `window.COURSE_DAYS = ${json};\n`;
}

function main() {
  const metaDays = parseDaysMeta();
  const days = buildAllDays(metaDays);
  if (days.length !== 100) throw new Error(`Output must have 100 entries, got ${days.length}`);
  for (let i = 0; i < 100; i++) {
    if (days[i].d !== i + 1) throw new Error(`Day order mismatch at index ${i}: expected ${i + 1}, got ${days[i].d}`);
    for (const key of ['t', 'b', 'time', 'prep', 'script', 'demo', 'mosh', 'homework']) {
      if (days[i][key] === undefined || days[i][key] === '') throw new Error(`Day ${days[i].d} missing field: ${key}`);
    }
    if (!Array.isArray(days[i].prep) || days[i].prep.length < 3) throw new Error(`Day ${days[i].d} prep must have 3-5 items`);
    if (!Array.isArray(days[i].demo) || days[i].demo.length < 5) throw new Error(`Day ${days[i].d} demo must have 5-8 items`);
  }
  fs.writeFileSync(OUTPUT_PATH, formatOutput(days), 'utf8');
  const stat = fs.statSync(OUTPUT_PATH);
  console.log(`Created ${OUTPUT_PATH}`);
  console.log(`Entries: ${days.length}`);
  console.log(`File size: ${stat.size} bytes`);
  console.log(`Day 1 script preview: ${days[0].script.slice(0, 200)}...`);
}

main();
