'use strict';

// Phase generators — required by build-days-data.js

const PROMPT_PARTS = {
  8: { part: '髪型', prompts: ['「女の子のイラスト。ツインテール、パステルピンクの髪。白背景、全身。」', '「同じ女の子。髪型だけロングストレートの黒髪に変更。」', '「同じ女の子。ボブヘア、茶色に変更。」'] },
  9: { part: '表情', prompts: ['「女の子、にっこり笑顔。バストアップ、白背景。」', '「同じ女の子、困り眉・口をへの字。困り顔。」', '「同じ女の子、頬を赤らめて目をそらす。照れ顔。」', '「同じ女の子、真剣な目、口を結ぶ。真剣顔。」'] },
  10: { part: 'ポーズ', prompts: ['「女の子、立ちポーズ、両手を体の横に。全身。」', '「同じ女の子、椅子に座って本を読む。」', '「同じ女の子、片手を振って挨拶。」', '「同じ女の子、横向きで振り返る。」'] },
  11: { part: '構図', prompts: ['「女の子、全身が入るロングショット。」', '「同じ女の子、バストアップ。」', '「同じ女の子、顔のアップ、目が画面いっぱい。」', '「同じ女の子、斜め45度構図。」'] },
  12: { part: '背景', prompts: ['「女の子、完全な白背景。」', '「同じ女の子、居心地のいいリビング。」', '「同じ女の子、公園のベンチ、青空。」', '「同じ女の子、シンプルな水玉模様の背景。」'] },
  13: { part: '画風', prompts: ['「女の子、日本のアニメ調、細い線画。」', '「同じ構図、水彩画風、にじみあり。」', '「同じ構図、フラットデザイン、影なし。」', '「同じ構図、ゆるい線画、ラフなタッチ。」'] }
};

function genPromptBasics(d, title, brief, mk) {
  if (PROMPT_PARTS[d]) {
    const p = PROMPT_PARTS[d];
    const promptList = p.prompts.map((pr, i) => `${i + 1}. ${pr}`).join('\n');
    const main = `【本編】\n今日は${p.part}を1つずつ指定する練習です。ChatGPT新規チャット、GPT-4o選択。\n\n以下を順番にコピペ送信：\n${promptList}\n\n各生成後、day${String(d).padStart(2, '0')}_0${1}〜 と連番保存。\n\n${p.part}ワード集をメモ帳に作ります：\n「使えた言葉：＿＿＿＿ / 効果：＿＿＿＿」を${p.prompts.length}行。\n\n${p.prompts.length}枚並べて、${p.part}で印象がどう変わるか確認してください。`;
    const demo = ['ChatGPT新規チャット', 'GPT-4o選択', ...p.prompts.map((_, i) => `プロンプト${i + 1}送信・保存`), `${p.part}ワード集をメモ`, `${p.prompts.length}枚並べて比較`];
    return mk(d, title, '5〜7分', ['ChatGPT Plus', 'メモ帳（ワード集用）', `保存フォルダ day${String(d).padStart(2, '0')}`], main, demo,
      `${p.part}別プロンプトの指定方法を、コピペで${p.prompts.length}枚生成しながら学びます。`,
      `今日作った${p.prompts.length}枚のうちベスト1枚と${p.part}ワード集をDiscord #day${d}-share に投稿してください。`);
  }

  const S = {
    14: { time: '6〜8分', prep: ['Week2ベスト1枚', 'プロンプトメモ', 'ChatGPT'],
      main: `【本編】\nWeek2振り返り。ベスト1枚をプロンプト全文で再現します。\n\n① Week2で一番好きだった画像を開く\n② プロンプト全文をコピー（なければ画像を見ながら再構成）\n③ ChatGPT新規チャットに全文をそのまま送信\n④ 再現度を5段階で評価\n\n振り返りシート：\n1. 再現度（1-5）：\n2. 再現できた要素：\n3. 再現できなかった要素：\n4. Week2で身についたスキル3つ：`,
      demo: ['ベスト1枚選定', 'プロンプト全文確認', 'ChatGPTに送信', '再現画像保存', '5段階評価', '振り返りシート記入'],
      mosh: 'Week2振り返り。ベスト1枚をプロンプト全文で再現し、パーツ別練習の成果を確認します。',
      homework: '再現Before/Afterと振り返りシートをDiscord #week2-review に投稿。' },
    15: { time: '6〜8分', prep: ['髪型・表情・ポーズワード集', 'ChatGPT', '5要素テンプレ'],
      main: `【本編】\n髪型＋表情＋ポーズを統合します。\n\n「ショートボブの女の子、水色の髪。にっこり笑顔、キラキラした瞳。片手を振って挨拶している立ちポーズ。全身、白背景。ゆるいアニメ調。」\n\n生成後：「同じキャラ、表情だけ困り顔に変更。」\n\n統合のコツ：髪型→表情→ポーズの順で書く。`,
      demo: ['ワード集を開く', '統合プロンプト送信', '1枚目保存', '表情変更で2枚目', '統合プロンプトをメモ保存'],
      mosh: '髪型・表情・ポーズを1枚に統合。統合プロンプトの書き方と順番のコツを学びます。',
      homework: '統合プロンプト全文と完成画像をDiscord #day15-share に投稿。' },
    16: { time: '6〜8分', prep: ['Day15統合プロンプト', '画風・背景・構図ワード集', 'ChatGPT'],
      main: `【本編】\nDay15のキャラに画風＋背景＋構図を追加。\n\n「Day15と同じ女の子。水彩画風。桜が舞う公園、全身、斜め構図。春の午後、暖かい光。」\n\n2枚目：構図だけ「バストアップ」に変更。\n\n順番：キャラ→画風→背景→構図→光/雰囲気`,
      demo: ['Day15プロンプト確認', '統合プロンプト送信', '1枚目保存', '構図変更2枚目', '完成版をメモ'],
      mosh: '画風・背景・構図を統合プロンプトに追加。統合の順番のコツを身につけます。',
      homework: '完成統合プロンプトと2枚をDiscord #day16-share に投稿。' },
    17: { time: '5〜7分', prep: ['Day16キャラ', 'ChatGPT', '小物リストメモ'],
      main: `【本編】\n小物4種、1枚ずつ。\n\n1. 「同じ女の子、両手で大きなひまわり。」\n2. 「同じ女の子、片手にオープンな本。」\n3. 「同じ女の子、両手でカフェラテのカップ。」\n4. 「同じ女の子、小さな白い猫を抱えている。」\n\n小物の型：「両手で〇〇 / 片手に〇〇」`,
      demo: ['花プロンプト', '本プロンプト', 'カッププロンプト', '猫プロンプト', '4枚保存'],
      mosh: '花・本・カップ・動物を添えて世界観を広げる。小物指定の例文4パターン。',
      homework: 'ベスト1枚と小物リスト3つをDiscord #day17-share に投稿。' },
    18: { time: '6〜8分', prep: ['Day16キャラ', 'ChatGPT', '配色メモ'],
      main: `【本編】\n同じキャラ、配色3パターン。\n\n1. 「全体パステルカラー。ピンク・水色・ラベンダー。」\n2. 「白・グレー・黒のモノトーン。シック。」\n3. 「原色ビビッド。赤・青・黄。元気。」\n\n配色ワード：pastel colors / monochrome / vivid colors`,
      demo: ['パステル版', 'モノトーン版', 'ビビッド版', '3枚比較', '配色ワード集'],
      mosh: 'パステル・モノトーン・ビビッドで同じキャラの印象を変える練習です。',
      homework: '3枚並べ画像と好きな配色＋理由をDiscord #day18-share に投稿。' },
    19: { time: '6〜8分', prep: ['定番キャラプロンプト', 'ChatGPT'],
      main: `【本編】\n春夏秋冬4枚シリーズ。\n\n春：「桜、パステルピンク、新緑。」\n夏：「青空、ひまわり、白ワンピ。」\n秋：「紅葉、オレンジ、マフラー。」\n冬：「雪、白とブルー、コート。」\n\nキャラの顔・髪型固定、季節要素と服だけ変更。`,
      demo: ['春生成', '夏生成', '秋生成', '冬生成', '4枚グリッド'],
      mosh: '同じキャラで春夏秋冬4枚。季節要素とシリーズ感の出し方を学びます。',
      homework: '4枚シリーズをDiscord #day19-share に投稿。' },
    20: { time: '6〜8分', prep: ['ベスト作品', 'ChatGPT', '統一感チェックリスト'],
      main: `【本編】\n統一感3枚。チェック：同キャラ / 同画風 / 同色味（3色）。\n\nパレット例：ピンク・水色・白\n\n1. 「メインキャラ、朝のカフェ。」\n2. 「同じキャラ、公園のベンチ。」\n3. 「同じキャラ、夜の窓辺。」\n\n画風・色味ワードは3枚同じ文を末尾に。`,
      demo: ['パレット決定', 'チェックリスト確認', '3枚生成', '統一感確認'],
      mosh: '同じ世界観・色味で3枚制作。統一感チェックリスト活用。',
      homework: '統一感3枚とパレット3色をDiscord #day20-share に投稿。' },
    21: { time: '5〜7分', prep: ['Day1-20ベスト', 'メモ帳', 'ChatGPT'],
      main: `【本編】\n定番プロンプト完成。\n\n① ベスト1枚のプロンプトをベースに編集\n② 「定番プロンプト」1つ完成\n\n振り返り：\n1. 定番プロンプト全文：\n2. 今後作りたいもの：\n3. Week3成長ポイント：`,
      demo: ['ベスト選定', 'プロンプト編集', '定番完成', 'テスト生成', '振り返り回答'],
      mosh: 'Week3振り返り。定番プロンプト1つを完成させ保存します。',
      homework: '定番プロンプトとテスト1枚をDiscord #week3-review に投稿。' },
    22: { time: '5〜7分', prep: ['定番プロンプト', 'ChatGPT'],
      main: `【本編】\nChatGPT限界テスト3つ。\n\n1. 「両手の指が5本ずつ正確な女の子」\n2. 「同じキャラ3枚、顔完全一致」\n3. 「服の柄を細かいチェック柄に」\n\n限界メモ：弱点（手/統一感/細部）\nMJ移行理由を1行。`,
      demo: ['手テスト', '統一感テスト', '細部テスト', '限界メモ'],
      mosh: 'ChatGPTの限界を体感し、Midjourney移行理由を整理します。',
      homework: '限界テスト3枚とメモをDiscord #day22-share に投稿。' },
    23: { time: '6〜8分', prep: ['PC', 'クレジットカード', 'Discord', 'メール'],
      main: `【本編】\nMidjourney準備。\n\n① midjourney.com → Discord連携ログイン\n② Basic $10/月プラン加入\n③ DiscordでMJ Bot確認\n④ テスト：\n/imagine a cute anime girl, pastel colors --ar 1:1\n\nU1-U4拡大、V1-V4バリエーションを確認。`,
      demo: ['midjourney.com', 'Discord連携', 'プラン加入', 'MJ Bot確認', '/imagine テスト', 'グリッド確認'],
      mosh: 'Midjourney登録・Discord参加・基本画面の見方。/imagine で初生成。',
      homework: 'MJテスト生成スクショをDiscord #day23-share に投稿。' },
    24: { time: '5〜7分', prep: ['定番プロンプト（日本語）', 'ChatGPT'],
      main: `【本編】\nChatGPTに翻訳依頼：\n「以下をMidjourney用の自然な英語に翻訳して。\n[定番プロンプト]」\n\n「MJ定番プロンプト（英語）」として保存。\n\n基本単語：cute / girl / pastel / anime style / full body / white background`,
      demo: ['日本語プロンプトコピー', '翻訳依頼', '英語版確認', 'メモ保存', '単語メモ'],
      mosh: 'ChatGPTプロンプトをMJ用英語に翻訳。基本単語を身につけます。',
      homework: '英語版定番プロンプトをDiscord #day24-share に投稿。' },
    25: { time: '7〜8分', prep: ['MJ定番（英語）', 'ChatGPT', 'Midjourney'],
      main: `【本編】\n同内容を両方で比較。\n\nChatGPT：定番プロンプト（日本語）\nMJ：/imagine [英語定番] --ar 1:1 --stylize 100\n\n比較：画質 / 細部 / 好み\nPhase1総まとめ：ChatGPTで学んだこと3つ、MJ期待3つ`,
      demo: ['ChatGPT生成', 'MJ /imagine', '2枚比較', '比較シート', 'Phase1総まとめ'],
      mosh: 'ChatGPT vs Midjourney比較。Phase1総まとめ。',
      homework: '比較2枚＋シートをDiscord #phase1-complete に投稿。' }
  };

  if (S[d]) { const s = S[d]; return mk(d, title, s.time, s.prep, s.main, s.demo, s.mosh, s.homework); }
  return mk(d, title, '5〜7分', ['ChatGPT Plus', 'メモ帳'], `【本編】\n${brief}`, ['ChatGPT起動', 'プロンプト送信', '保存'], brief, '成果物1枚をDiscordにシェア。');
}

const MJ_BASE = 'cute anime girl, pastel pink hair, big sparkling eyes, soft smile';

const MJ_DAYS = {
  26: { prompt: `${MJ_BASE}, full body, white background --ar 1:1 --stylize 100`, main: `【本編】\nMidjourneyで最初の1枚。\n\nDiscordで入力：\n/imagine ${MJ_BASE}, full body, white background --ar 1:1 --stylize 100\n\n60秒待つ→4枚グリッド→気に入った番号の U1〜U4 で拡大→右クリック保存。\n\nファイル名：day26_first.png`, demo: ['Discord MJチャンネル', '/imagine 入力', '4枚待つ', 'U1-U4で拡大', '画像保存', 'ファイル名変更'] },
  27: { prompt: `${MJ_BASE}, bust shot --ar 1:1`, main: `【本編】\nUpscaleとVariation。\n\n/imagine ${MJ_BASE}, bust shot --ar 1:1\n\n4枚から1枚選び U1 で拡大。\n\nV1 でバリエーション4枚→また1枚選び U2。\n\nベスト1枚を day27_best.png で保存。`, demo: ['/imagine 入力', 'グリッド確認', 'U1拡大', 'V1バリエーション', 'ベスト選定', '保存'] },
  28: { prompt: `${MJ_BASE}, soft lighting, detailed illustration, high quality --ar 1:1 --stylize 100`, main: `【本編】\nMJプロンプト構造：主語＋詳細＋画風＋品質。\n\nテンプレ：\n[subject], [details], [style], [quality words] --ar 1:1 --stylize 100\n\n例：\n/imagine ${MJ_BASE}, holding a bouquet of flowers, anime illustration style, soft lighting, detailed, high quality --ar 1:1 --stylize 100\n\nテンプレをメモ帳に「MJ基本テンプレ」として保存。`, demo: ['テンプレ確認', '/imagine 入力', '4枚確認', 'U1拡大', 'テンプレ保存'] },
  29: { prompt: `${MJ_BASE}, full body --ar`, main: `【本編】\nアスペクト比3種比較。同じプロンプト、--ar だけ変える。\n\n1:1 → --ar 1:1（Instagram正方形）\n16:9 → --ar 16:9（Xヘッダー）\n9:16 → --ar 9:16（ストーリー）\n\n/imagine ${MJ_BASE}, full body, white background --ar 1:1\n/imagine ${MJ_BASE}, full body, white background --ar 16:9\n/imagine ${MJ_BASE}, full body, white background --ar 9:16`, demo: ['--ar 1:1 生成', '--ar 16:9 生成', '--ar 9:16 生成', '3枚比較', '用途メモ'] },
  30: { prompt: `${MJ_BASE}, full body --stylize`, main: `【本編】\n--stylize 比較3段階。\n\n低：--stylize 50\n中：--stylize 100\n高：--stylize 250\n\n/imagine ${MJ_BASE}, full body --ar 1:1 --stylize 50\n（100、250も同様）\n\n好みの数値をメモ：「私の stylize：＿＿」`, demo: ['stylize 50', 'stylize 100', 'stylize 250', '3枚比較', '好み数値メモ'] },
  31: { prompt: `${MJ_BASE}, fantasy background --chaos`, main: `【本編】\n--chaos 比較。\n\n0：--chaos 0（安定）\n50：--chaos 50（中程度）\n100：--chaos 100（意外性大）\n\n同プロンプトで3回。意外性と安定性のバランスを確認。`, demo: ['chaos 0', 'chaos 50', 'chaos 100', '3枚比較', '好みchaosメモ'] },
  32: { prompt: `${MJ_BASE}, in a busy city street --no`, main: `【本編】\n--no で不要要素除外。\n\n/imagine ${MJ_BASE}, in a busy city street --ar 1:1\n→ 余計な人が出る\n\n/imagine ${MJ_BASE}, in a city street --no people, cars, text --ar 1:1\n\nよく使う --no：people, text, watermark, blurry, extra fingers`, demo: ['--no なし生成', '--no あり生成', '2枚比較', '--noリストメモ'] },
  33: { prompt: `${MJ_BASE}, reading a book in a cozy room --ar 1:1 --stylize 100`, main: `【本編】\n同プロンプト5回生成（リロール）。\n\n/imagine ${MJ_BASE}, reading a book in a cozy room --ar 1:1 --stylize 100\n\n5回実行し、10〜20枚からベスト1枚。\n\n当たり引きのコツ：光・表情・構図で選ぶ。`, demo: ['1回目', '2回目', '3回目', '4回目', '5回目', 'ベスト選定'] },
  34: { prompt: '', main: `【本編】\n失敗例3枚＋原因分析。\n\n意図的に失敗プロンプト3つ：\n1. 「girl」（短すぎ）\n2. 「cute girl, realistic photo, anime style」（矛盾）\n3. 「girl with 6 fingers」（異常指定）\n\n各失敗の原因を1行で分析。\nよくある失敗：短い/矛盾/異常/長すぎ`, demo: ['失敗1生成', '原因分析', '失敗2生成', '原因分析', '失敗3生成', '原因分析'] },
  35: { prompt: '', main: `【本編】\nWeek5振り返り。MJベスト5枚整理。\n\n① Day26-34からベスト5選\n② 各プロンプト全文をメモ\n③ フォルダ mj_best/ に整理\n\n振り返り：\n1. いちばん上達した点：\n2. 苦手なパラメータ：\n3. Week6の目標：`, demo: ['ベスト5選定', 'プロンプト保存', 'フォルダ整理', '振り返り3問'] },
  36: { prompt: 'cute chibi girl, fluffy pastel colors, round face, big eyes, kawaii style --ar 1:1 --stylize 150', main: `【本編】\nかわいい系3枚。\n\n1. /imagine cute chibi girl, fluffy pastel colors, round face, big eyes, kawaii style --ar 1:1 --stylize 150\n2. /imagine cute girl, soft pink and blue, holding a teddy bear, kawaii illustration --ar 1:1 --stylize 150\n3. /imagine adorable anime girl, pastel rainbow hair, starry eyes, sweet smile --ar 1:1 --stylize 150`, demo: ['かわいい1', 'かわいい2', 'かわいい3', 'ワード集メモ'] },
  37: { prompt: 'elegant young woman, navy dress, sophisticated, mature anime style --ar 1:1 --stylize 100', main: `【本編】\n大人っぽい系3枚。\n\n1. /imagine elegant young woman, navy dress, sophisticated, mature anime style --ar 1:1 --stylize 100\n2. /imagine beautiful woman, monochrome outfit, minimalist, chic atmosphere --ar 1:1 --stylize 100\n3. /imagine refined anime lady, evening gown, soft lighting, elegant pose --ar 1:1 --stylize 100`, demo: ['大人1', '大人2', '大人3', 'ワード集'] },
  38: { prompt: 'anime girl, watercolor painting style --ar 1:1', main: `【本編】\n画風バリエーション3枚。\n\n1. /imagine anime girl, watercolor painting style, soft edges --ar 1:1 --stylize 100\n2. /imagine anime girl, flat design, bold colors, no shadows --ar 1:1 --stylize 80\n3. /imagine anime girl, loose sketch style, rough lines, artistic --ar 1:1 --stylize 120`, demo: ['水彩', 'フラット', 'スケッチ', '画風メモ'] },
  39: { prompt: `${MJ_BASE}, [composition] --ar 1:1`, main: `【本編】\n構図5種をMJで。\n\n1. full body shot\n2. bust shot\n3. close-up face\n4. dutch angle\n5. from behind looking back\n\n各 /imagine ${MJ_BASE}, [composition] --ar 1:1 --stylize 100`, demo: ['全身', 'バスト', 'アップ', '斜め', '振り返り'] },
  40: { prompt: `${MJ_BASE}, [expression/pose] --ar 1:1`, main: `【本編】\n表情・ポーズ MJ版。\n\n表情：smiling / shy blush / serious / surprised\nポーズ：waving / sitting / running / peace sign\n\n4表情＋4ポーズ、計8枚（今日は4枚、残りは宿題）。`, demo: ['笑顔', '照れ', '真剣', '驚き'] },
  41: { prompt: `${MJ_BASE}, [background+prop] --ar 1:1`, main: `【本編】\n背景＋小物3枚。\n\n1. ${MJ_BASE}, cherry blossom park, holding a book --ar 1:1\n2. ${MJ_BASE}, cozy cafe interior, holding coffee cup --ar 1:1\n3. ${MJ_BASE}, starry night sky, holding a lantern --ar 1:1`, demo: ['公園+本', 'カフェ+カップ', '星空+ランタン'] },
  42: { prompt: `${MJ_BASE}, same character --seed`, main: `【本編】\nseed で統一感。\n\n1枚目生成→メッセージ右上「…」→ seed 番号をコピー。\n\n2枚目：同プロンプト + --seed [番号]\n3枚目：ポーズ変更 + --seed [番号]\n\n3枚そろえて統一感確認。`, demo: ['1枚目生成', 'seedコピー', 'seed指定2枚目', 'seed指定3枚目'] },
  43: { prompt: `${MJ_BASE}, consistent color palette --ar 1:1`, main: `【本編】\n色味・画風固定4枚。\n\nパレット：#FFB8D0 #B8E8D0 #9B7FD4\n\n4シーン：朝/昼/夕/夜\n\n各プロンプト末尾に同じ画風ワード：\nanime illustration, soft pastel palette, consistent style --stylize 100`, demo: ['朝', '昼', '夕', '夜', '4枚並べ'] },
  44: { prompt: `${MJ_BASE}, face close-up, icon style, centered composition --ar 1:1 --stylize 100`, main: `【本編】\nアイコン用。\n\n/imagine ${MJ_BASE}, face close-up, icon style, centered composition, clean background --ar 1:1 --stylize 100\n\nU1拡大→正方形確認→SNSアイコンサイズ（400x400）で書き出し。`, demo: ['/imagine アイコン用', 'U1拡大', '正方形確認', '400x400書き出し'] },
  45: { prompt: `${MJ_BASE}, instagram feed post --ar 4:5`, main: `【本編】\n投稿用4:5。\n\n/imagine ${MJ_BASE}, beautiful composition, instagram feed post --ar 4:5 --stylize 100\n\n4:5と16:9を比較。フィード向けは4:5推奨。`, demo: ['--ar 4:5 生成', '--ar 16:9 比較', 'ベスト選定', '保存'] },
  46: { prompt: `${MJ_BASE}, wide banner composition --ar 16:9`, main: `【本編】\nヘッダー・バナー用。\n\n/imagine ${MJ_BASE}, wide banner composition, space for text on left, soft background --ar 16:9 --stylize 100\n\nX/Instagramヘッダーサイズ確認。`, demo: ['--ar 16:9 生成', 'U1拡大', 'ヘッダーサイズ確認'] },
  47: { prompt: '', main: `【本編】\n推しの子設定シート。\n\nメモ帳に記入：\n名前：\n年齢：\n性格（3語）：\n髪型・髪色：\n目の色：\n服装：\n好きなもの：\n口癖：\n\nMJプロンプトに変換：\n/imagine [名前], [髪型], [目], [服装], [性格を表情に], anime style --ar 1:1 --stylize 100`, demo: ['設定シート記入', 'プロンプト変換', 'MJ生成', '設定シート保存'] },
  48: { prompt: '', main: `【本編】\n推しの子3バリエーション。\n\n設定シートベースで：\n1. 通常ポーズ\n2. 季節衣装（夏）\n3. 特殊ポーズ（応援）\n\n/imagine [設定], standing normally --ar 1:1\n/imagine [設定], summer outfit, holding ice cream --ar 1:1\n/imagine [設定], cheering pose, peace sign --ar 1:1`, demo: ['通常', '夏衣装', '応援ポーズ'] },
  49: { prompt: '', main: `【本編】\nポートフォリオ10枚整理。\n\n① Day26-48からベスト10選\n② 命名：portfolio_01.png 〜 10\n③ フォルダ portfolio/ に整理\n\n選定基準：画質 / 統一感 / 用途バリエーション`, demo: ['ベスト10選', 'リネーム', 'フォルダ整理', '一覧確認'] },
  50: { prompt: '', main: `【本編】\nPhase2中間総仕上げ。\n\n推しの子＋用途別1枚ずつ確認：\n□ アイコン\n□ フィード投稿\n□ バナー\n\n最高傑作1枚を選び day50_masterpiece.png で保存。\n\n振り返り：Phase2で学んだこと3つ`, demo: ['用途別確認', '最高傑作選定', '保存', '振り返り'] }
};

function genMidjourney(d, title, brief, mk) {
  const m = MJ_DAYS[d];
  if (m) {
    const prep = d >= 47 ? ['メモ帳（設定シート）', 'Midjourney', 'Discord'] : ['Midjourney', 'Discord', 'MJ定番プロンプト', 'メモ帳'];
    const demo = m.demo || ['/imagine 入力', 'グリッド確認', 'U1拡大', '保存'];
    const homework = d === 44
      ? '【課題】自分のアイコンを作ってみよう。動画のプロンプトで1枚作り、400×400で保存。完成したアイコン画像をDiscord #day44-share に投稿してください。'
      : `Day${d}の成果物をDiscord #day${d}-share に投稿してください。`;
    return mk(d, title, d === 35 || d === 49 || d === 50 ? '6〜8分' : '5〜7分', prep, m.main, demo,
      brief + ' Midjourney実践Day。',
      homework);
  }
  return mk(d, title, '5〜7分', ['Midjourney', 'Discord'], `【本編】\n${brief}`, ['/imagine', '保存'], brief, '成果物をDiscordにシェア。');
}

const SNS_DAYS = {
  51: { main: `【本編】\nX or Instagram、1つに絞る。\n\n比較シート記入：\n| | X | Instagram |\n| 画像表示 | | |\n| ハッシュタグ | | |\n| 交流のしやすさ | | |\n| 自分の作品との相性 | | |\n\n決定：「私は＿＿で発信する。理由：＿＿」\n\nアカウントがなければ今日中に作成。`, demo: ['比較シート記入', 'SNS決定', 'アカウント作成/確認'], prep: ['メモ帳', 'SNSアプリ'] },
  52: { main: `【本編】\nプロフィール設計。\n\n① アイコン：Day44のアイコン画像を設定\n② 名前：「[ハンドル名] | AIイラスト」\n③ bio テンプレ：\n「AIで描く[テイスト]イラスト🎨\n100日チャレンジ中（Day52/100）\n#AIart #もふスタ100日」\n④ 固定投稿（下書き）：自己紹介＋代表作1枚`, demo: ['アイコン設定', '名前入力', 'bio入力', '固定投稿下書き'], prep: ['アイコン画像', '代表作1枚', 'SNSアプリ'] },
  53: { main: `【本編】\n初投稿。\n\nキャプションテンプレ：\n「はじめまして！[名前]です🌸\nAIで[テイスト]イラストを描いています。\n100日チャレンジ Day53、今日から発信始めます！\nよろしくお願いします✨\n#AIart #AIイラスト #もふスタ100日 #初投稿」\n\n画像：ベスト作品1枚\n\n投稿前チェック：アイコン/bio/画像/タグ`, demo: ['キャプションコピー', '画像選択', 'タグ確認', '投稿', 'スクショ保存'], prep: ['ベスト作品1枚', 'SNSアプリ'] },
  54: { main: `【本編】\n制作過程 Before/After投稿。\n\nキャプション：\n「Before→Afterで修正しました🎨\n1枚目：最初の生成\n2枚目：3回修正後\nプロンプト改善でここまで変わります！\n#AIart #制作過程 #BeforeAfter #もふスタ100日」\n\n画像：Day6のBefore/After or 2枚並べ`, demo: ['Before/After画像準備', 'キャプション', '投稿'], prep: ['Before/After画像', 'SNSアプリ'] },
  55: { main: `【本編】\n推しの子 or ベスト作品投稿。\n\nキャプション：\n「[推しの子名]を描きました💕\n[設定を1行：性格/特徴]\n#AIart #オリキャラ #もふスタ100日 #[推しの子名]」`, demo: ['作品選択', 'キャプション作成', '投稿'], prep: ['推しの子画像', 'SNSアプリ'] },
  56: { main: `【本編】\n交流5人。\n\n① ハッシュタグ #AIart #AIイラスト で検索\n② 同ジャンル5人に：\n  - いいね\n  - コメント（テンプレ）：\n「素敵な作品ですね！✨ [具体的な褒め：色使い/表情/etc]」\n③ 5人リストをメモ`, demo: ['ハッシュタグ検索', '5人選定', 'いいね', 'コメント', 'リストメモ'], prep: ['SNSアプリ', 'メモ帳'] },
  57: { main: `【本編】\nWeek9振り返り。\n\n分析シート：\n1. 今週の投稿数：\n2. フォロワー数（開始→現在）：\n3. いちばん伸びた投稿：\n4. 伸びた理由：\n5. 来週改善点：`, demo: ['投稿数カウント', 'フォロワー確認', 'TOP投稿確認', '分析シート', 'Discord共有'], prep: ['SNSアプリ', '分析シート'] },
  58: { main: `【本編】\n推しの子新規1枚制作＋投稿。\n\n/imagine [推しの子設定], new outfit, autumn leaves background --ar 4:5 --stylize 100\n\nキャプション：「[推しの子名] 秋バージョン🍂\n#AIart #推しの子 #もふスタ100日」`, demo: ['MJ生成', 'U1拡大', 'キャプション', '投稿'] },
  59: { main: `【本編】\n前日の修正 or 別ポーズ。\n\nV1でバリエーション→ベスト選定\nor プロンプト修正：「expression: gentle smile, looking at viewer」\n\n投稿キャプション：「少し修正しました✨」`, demo: ['V1 or 修正', 'ベスト選定', '投稿'] },
  60: { main: `【本編】\n週1投稿目。\n\n今週の投稿スケジュール確認。\n推しの子 or ベスト作品を1本投稿。\n\nキャプション＋ハッシュタグ3つ以上。`, demo: ['スケジュール確認', '作品選択', '投稿'] },
  61: { main: `【本編】\n推しの子シリーズ続き。新規1枚。\n\n/imagine [設定], winter outfit, snow scene --ar 4:5\n\n「[推しの子名] 冬コーデ❄️」`, demo: ['MJ生成', '保存', '投稿'] },
  62: { main: `【本編】\nクオリティアップ修正。\n\nUpscale → V1 → プロンプト微調整\n--stylize を好み値に調整\n\n「クオリティアップ版✨ Before→After」`, demo: ['Upscale', 'V1', '微調整', 'Before/After投稿'] },
  63: { main: `【本編】\n週2投稿目。\n\n2本目投稿。エンゲージメント確認。\n\n「今週2本目！/[テーマ]」`, demo: ['作品選択', 'キャプション', '投稿', '反応確認'] },
  64: { main: `【本編】\nWeek10振り返り。\n\nベスト1枚選定。\nWeek10分析：投稿数/フォロワー/伸びた投稿`, demo: ['ベスト選定', 'Week10分析', 'Discord共有'] },
  65: { main: `【本編】\n季節/イベントネタ新規1枚。\n\n例（5月）：\n/imagine [推しの子], rainy season, holding umbrella, hydrangea --ar 4:5\n\n「梅雨の[推しの子名]☔️」`, demo: ['季節ネタ決定', 'MJ生成', '投稿'] },
  66: { main: `【本編】\n別構図 or 別小物バリエーション。\n\n構図変更：bust shot → full body\n小物変更：umbrella → flower`, demo: ['バリエーション生成', '比較', '投稿'] },
  67: { main: `【本編】\n週3投稿目。\n\n3本目投稿。`, demo: ['作品選択', '投稿', '反応確認'] },
  68: { main: `【本編】\n季節ネタ続き。新規1枚。\n\n/imagine [設定], [イベント], [小物] --ar 4:5`, demo: ['ネタ決定', '生成', '投稿'] },
  69: { main: `【本編】\n自由制作1枚。\n\n好きなテーマでOK。\n/imagine [自由] --ar 4:5 --stylize [好み値]`, demo: ['テーマ決定', '生成', '投稿'] },
  70: { main: `【本編】\n週4投稿目。\n\n4本目投稿。今週の投稿4本達成チェック。`, demo: ['投稿', '週4達成確認'] },
  71: { main: `【本編】\nWeek11振り返り。投稿15本達成チェック。\n\n1. 累計投稿数：\n2. フォロワー数（目安20-30人）：\n3. 伸びた投稿TOP3：\n4. 改善点：`, demo: ['投稿数カウント', 'フォロワー確認', 'TOP3', '振り返りシート'] },
  72: { main: `【本編】\n伸びる型① 制作過程＋プロンプト一部公開。\n\nキャプション：\n「制作過程🎨\n1. 最初の生成\n2. 修正後\n💡使ったプロンプト（一部）：\n"[プロンプトの最初の20語]..."\n#AIart #プロンプト公開 #制作過程」`, demo: ['Before/After準備', 'プロンプト一部コピー', 'キャプション', '投稿'] },
  73: { main: `【本編】\n伸びる型② 「〇〇な子を描いてみた」\n\nキャプション：\n「[季節/テーマ]な子を描いてみた🌸\n[1行説明]\n#AIart #AIイラスト #[テーマ]」\n\n例：「桜の季節な子を描いてみた🌸」`, demo: ['テーマ決定', '作品選択', 'キャプション', '投稿'] },
  74: { main: `【本編】\n伸びる型③ 質問箱・投票。\n\nキャプション：\n「次どれ描こう？🤔\nA: [テーマ1]\nB: [テーマ2]\nC: [テーマ3]\nコメントで教えてください！\n#AIart #投票 #もふスタ100日」\n\nA/B/C用に3枚サムネ準備。`, demo: ['3テーマ決定', 'サムネ3枚', '投票投稿'] },
  75: { main: `【本編】\nPhase3振り返り。伸びた投稿TOP3分析。\n\n各投稿について：\n1. 投稿タイプ（過程/推し/投票/etc）\n2. いいね数\n3. 伸びた理由\n4. Phase4で続けたい型：`, demo: ['TOP3選定', '分析シート', 'Phase4準備メモ', 'Discord共有'] }
};

function genSNS(d, title, brief, mk) {
  const s = SNS_DAYS[d];
  if (s) {
    const prep = s.prep || ['SNSアプリ', '作品画像', 'メモ帳'];
    const demo = s.demo || ['準備', 'キャプション', '投稿', '確認'];
    return mk(d, title, d === 57 || d === 64 || d === 71 || d === 75 ? '6〜8分' : '5〜7分', prep, s.main, demo, brief, `Day${d}の投稿スクショをDiscord #day${d}-share に共有してください。`);
  }
  return mk(d, title, '5〜7分', ['SNSアプリ'], `【本編】\n${brief}`, ['投稿'], brief, '投稿をDiscordにシェア。');
}

const SPRINT_DAYS = {
  76: { main: `【本編】\nDay76 シリーズ開始。\n\n「Day XX」シリーズ化：\nキャプションに「100日チャレンジ Day76🌟」を毎回入れる。\n\n残り25日戦略シート：\n1. 現在フォロワー：\n2. 目標100人まであと：\n3. 週の投稿数（目標4）：\n4. 交流人数/日（目標5）：`, demo: ['戦略シート', 'Day76投稿', 'シリーズタグ確認'] },
  77: { main: `【本編】\n週4投稿リズム。\n\n月・水・金・土 投稿カレンダー作成。\n\n今週分を埋める：\n月：[テーマ]\n水：[テーマ]\n金：[テーマ]\n土：[テーマ]`, demo: ['カレンダー作成', '今週4テーマ決定', '月曜分投稿'] },
  78: { main: `【本編】\n毎日5人交流の習慣化。\n\nルーティン：\n① #AIart 検索\n② 5人いいね＋コメント\n③ 週2は深いコメント（50字以上）\n\n今日の5人リスト記録。`, demo: ['検索', '5人交流', 'リスト記録'] },
  79: { main: `【本編】\nDiscord・コミュニティ内シェア。\n\n#day79-share に今日の作品＋投稿リンク。\n相互フォロー3人。\n\n「応援ありがとう！/[相手の作品の良い点]」`, demo: ['Discord投稿', '相互フォロー3人', 'コメント'] },
  80: { main: `【本編】\nWeek13振り返り。フォロワーチェック。\n\n1. 現在フォロワー：\n2. Week76開始時比：\n3. 目標とのギャップ：\n4. 来週の修正：`, demo: ['フォロワー確認', '振り返りシート', 'Discord共有'] },
  81: { main: `【本編】\nベスト作品再投稿①。\n\n過去ベスト1枚を選び再投稿。\n\nキャプション：\n「人気だったこの子、再掲します✨\n#AIart #再投稿 #もふスタ100日 Day81」`, demo: ['ベスト選定', 'キャプション', '再投稿'] },
  82: { main: `【本編】\nベスト再投稿②。2枚目。\n\n別のベスト作品を再投稿。\n「もう1枚お気に入り再掲🎨 Day82」`, demo: ['2枚目選定', '再投稿'] },
  83: { main: `【本編】\n伸びなかった投稿の改善。\n\n① 伸びなかった投稿1つ選定\n② 分析：画像/キャプション/時間帯/タグ\n③ 改善版を新規制作＋投稿`, demo: ['伸びなかった投稿選定', '分析', '改善版制作', '投稿'] },
  84: { main: `【本編】\n100日チャレンジ参加者と相互フォロー。\n\nDiscord #day84-matching で3人とマッチング。\n相互フォロー＋最新作にコメント。`, demo: ['マッチング', '相互フォロー', 'コメント'] },
  85: { main: `【本編】\nWeek14振り返り。フォロワー70人前後チェック。\n\n1. 現在フォロワー：\n2. 70人まであと：\n3. ラスト2週間の戦略：`, demo: ['フォロワー確認', '振り返り', '戦略更新'] },
  86: { main: `【本編】\nベスト5枚ピン留め・プロフィール更新。\n\n① ベスト5選\n② プロフィールに「代表作」としてリンク or ハイライト\n③ bio更新：「100日チャレンジ Day86/100 | フォロワー[数]人」`, demo: ['ベスト5選', 'プロフィール更新', 'bio更新'] },
  87: { main: `【本編】\n「100日でこう変わった」まとめ①。\n\nキャプション：\n「100日チャレンジ、こう変わりました🌱\nDay1：[最初の作品説明]\nDay87：[今の作品説明]\n学び3つ：\n1. [学び1]\n2. [学び2]\n3. [学び3]\n#100日チャレンジ #BeforeAfter #もふスタ100日 Day87」\n\nBefore/After画像添付。`, demo: ['Day1作品確認', 'Before/After作成', '学び3つ', '投稿'] },
  88: { main: `【本編】\nまとめ投稿② 制作過程。\n\nDay1→Day50→Day88の3枚並べ。\n\n「制作過程まとめ🎨 100日の成長が見える3枚\n#制作過程 #100日チャレンジ Day88」`, demo: ['3枚選定', '並べ画像作成', '投稿'] },
  89: { main: `【本編】\nフォロワー向け感謝投稿。\n\n「いつも見てくれてありがとうございます💕\n100日チャレンジもあと少し！\nこれからもよろしくお願いします✨\n#感謝 #もふスタ100日 Day89」`, demo: ['感謝キャプション', 'ベスト作品', '投稿'] },
  90: { main: `【本編】\nラストスパート開始。残り10日計画。\n\n1. 現在フォロワー：\n2. 100人まであと：\n3. Day90-93 投稿テーマ：\n4. Day94-97 卒業制作スケジュール：\n5. Day98-100 振り返り・完走：\n\n今日 Day90 投稿：\n「ラストスパート開始！🚀 あと10日 Day90」`, demo: ['10日計画シート', 'フォロワー確認', 'Day90投稿'] },
  91: { main: `【本編】\nラストスパート ベスト作品投稿。\n\n/portfolio から最高傑作1枚。\n\n「今の最高傑作✨ 100日チャレンジ Day91\n#AIart #ベスト作品 #もふスタ100日」`, demo: ['最高傑作選定', '投稿'] },
  92: { main: `【本編】\n推しの子最新版 制作＋投稿。\n\n/imagine [推しの子設定], best quality, detailed, masterpiece --ar 4:5 --stylize [好み値]\n\n「[推しの子名] 最新版💕 Day92」`, demo: ['MJ生成', 'U1拡大', '投稿'] },
  93: { main: `【本編】\n制作過程投稿。\n\n/generate → 修正3回 → 完成 のスクショ4枚。\n\n「制作過程公開🎨 3回の修正でここまで\n#制作過程 #Day93 #もふスタ100日」`, demo: ['過程スクショ4枚', 'キャプション', '投稿'] },
  94: { main: `【本編】\n卒業制作① テーマとコンセプト決定。\n\n設定シート：\n1. テーマ（例：推しの子の世界観全開）\n2. コンセプト（1文）：\n3. 参考作品3枚（自分の過去作）\n4. 使うプロンプトベース：\n5. 完成イメージ（色/構図/雰囲気）：\n\n今日は制作せず、設計のみ。`, demo: ['テーマ決定', 'コンセプト1文', '参考3枚選定', '設定シート完成'] },
  95: { main: `【本編】\n卒業制作② 制作スタート。\n\n設定シートベースで初稿：\n/imagine [卒業プロンプト] --ar 4:5 --stylize [好み値]\n\n3回生成しベスト1枚。\n\n修正メモ：\n1. [修正点]\n2. [修正点]`, demo: ['初稿生成×3', 'ベスト選定', '修正メモ'] },
  96: { main: `【本編】\n卒業制作③ 仕上げと完成。\n\nV1バリエーション → Upscale\n--stylize / --chaos 微調整\n\n完成品：graduation_final.png\n\n完成チェック：\n□ テーマ一致 □ クオリティ □ 統一感`, demo: ['V1', 'Upscale', '微調整', '完成チェック', '保存'] },
  97: { main: `【本編】\n卒業制作を公開。\n\nキャプション：\n「100日チャレンジ 卒業制作🎓✨\n[コンセプト1文]\n100日で学んだ3つ：\n1. [学び1]\n2. [学び2]\n3. [学び3]\n#卒業制作 #100日チャレンジ #もふスタ100日 Day97」\n\n※卒業式はなし。作品公開がゴール。`, demo: ['卒業制作画像', 'キャプション', '投稿', '反応確認'] },
  98: { main: `【本編】\n100日総まとめ ベスト10枚振り返り。\n\n① Day1-97からベスト10選\n② 最初（Day1-7）と今（Day90+）のBefore/After\n\n振り返りワーク：\n1. 100日で一番変わったこと：\n2. 得意になったこと：\n3. これからも続けたいこと：`, demo: ['ベスト10選', 'Before/After', '振り返りワーク'] },
  99: { main: `【本編】\nフォロワー100人達成チェック＆次の目標。\n\n1. 現在フォロワー：\n2. 100人達成？ Yes/No\n3. 未達の場合：あと何人、どうする？\n4. 次の100日目標（1つ）：\n\n投稿：\n「Day99 フォロワー[数]人！100日チャレンジもあと1日\n次の目標：[目標] #もふスタ100日」`, demo: ['フォロワー確認', '次目標設定', 'Day99投稿'] },
  100: { main: `【本編】\n100日完走！\n\n完走投稿キャプション：\n「100日チャレンジ完走しました🎊🎉\nDay1から今日まで、100日間AIイラストと発信を続けました。\nこれからも週3投稿・毎日5人交流を続けます！\n同じように始めたい方、一緒に頑張りましょう✨\n#100日完走 #もふスタ100日 #AIart」\n\n完走チェックリスト：\n□ 100日分の動画視聴\n□ 卒業制作公開\n□ フォロワー目標確認\n□ 次の習慣設定`, demo: ['完走キャプション', '完走投稿', 'チェックリスト確認', 'Discord #day100-complete'] }
};

function genFollowerSprint(d, title, brief, mk) {
  const s = SPRINT_DAYS[d];
  if (s) {
    const isReview = [80, 85, 98].includes(d);
    const isGrad = d >= 94 && d <= 97;
    const prep = isGrad ? ['卒業設定シート', 'Midjourney', 'SNSアプリ'] : ['SNSアプリ', 'メモ帳', '作品フォルダ'];
    const demo = s.demo || ['準備', '実行', '投稿', '確認'];
    const time = isReview || isGrad || d === 100 ? '6〜8分' : '5〜7分';
    return mk(d, title, time, prep, s.main, demo, brief,
      d === 100 ? '完走投稿スクショをDiscord #day100-complete に必ず投稿してください。' : `Day${d}の成果をDiscord #day${d}-share に投稿してください。`);
  }
  return mk(d, title, '5〜7分', ['SNSアプリ'], `【本編】\n${brief}`, ['実行', '投稿'], brief, 'Discordにシェア。');
}

module.exports = { genPromptBasics, genMidjourney, genSNS, genFollowerSprint };
