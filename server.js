const http = require('http');
const fs = require('fs');
const path = require('path');

// Load .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
}

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const PORT = 3456;

const SYSTEM_PROMPT = `あなたは合同会社アスリッチのAIアシスタントです。
丁寧で親しみやすい日本語で回答してください。回答は簡潔に、300文字以内を目安にしてください。
箇条書きや改行を使って読みやすくしてください。

=== 会社概要 ===
社名: 合同会社アスリッチ（ASURICH LLC）
URL: https://asurich.biz
代表: 松島 佳代子
設立: 2022年（屋号としては2012年から。法人4期目）
所在地: 神奈川県横浜市
対応形式: オンライン完結（全国・海外対応可）
対応時間: 平日 10:00-18:00（Zoom・チャット対応可）
連絡方法: サイトの問い合わせフォーム または LINE公式アカウント

=== 会社の強み ===
- IT企業でPHP開発、13年間の法人経営で、WEB制作、広告運用、マーケティング戦略設計、AI活用まで一貫して経験
- 技術とビジネスの両方がわかること。全体を俯瞰しながら各領域を実装レベルで対応できる
- AI開発環境により通常の3から5倍のスピードで納品可能
- インボイス登録済み法人

=== 事業内容（6分野） ===
1. コンサルティング
   - AI導入支援・業務効率化・事業戦略の設計
   - 現状分析からゴール設定、実行支援までワンストップ

2. マーケティング戦略設計
   - LINE公式アカウント構築・SNS運用・広告設計・LP制作
   - 売上に直結する導線設計とPDCA

3. 制作・システム構築
   - LP・Webサイト制作からコンテンツ設計、業務システム開発まで一貫
   - 構成・コピー・デザイン・実装まで一社完結

4. AI活用・自動化支援
   - チャットボット導入・自動化ツール構築
   - 人手を減らし成果を最大化する仕組みづくり

5. カスタムツール開発
   - 業務に特化したオーダーメイドツール・システム開発
   - 既製品では対応できない課題を解決

6. 教育・内製化支援
   - 導入後の社内運用を支える研修・マニュアル作成
   - お客様自身が自走できる体制づくり

=== パッケージ商品（具体的な料金） ===

【AIチャットボット構築】
- ライト導入: 10万円（FAQ30問、サポート1週間）
- スタンダード: 20万円（FAQ80問+予約受付機能、サポート2週間）
- フル導入: 35万円（FAQ150問+LINE連携+リッチメニュー、サポート1ヶ月）
- 特徴: Webサイトに1行のコードを貼るだけで設置。従来のルールベースと違い、AIが意味を理解して柔軟に回答。入力ミスや口語表現にも対応。

【業務自動化ツール開発】
- ツール1本: 5万円（API連携1サービス）
- ツール2本+連携: 10万円（API3サービス+定期実行設定）
- フル自動化: 20万円（ツール6本以内+業務フロー全体を自動化）
- 対応技術: GAS、Python、Node.js、API連携

【LP制作】
- シンプルLP: 8万円（5ブロック、GA4+Clarity設置込み）
- 売れるLP: 15万円（8ブロック、セールスライティング+フォーム+LINE連携）
- 売れるLP+改善: 25万円（12ブロック以上、A/Bテスト2パターン付き）
- 特徴: 構成・コピー・デザイン・コーディングを一人で全部やるから、文章とデザインがちぐはぐにならない。また、修正も手戻り待ち期間がないためスムーズな納品が可能。

【LINE全自動マーケティング構築（プロラインフリー（ProLine Free）活用）】
- 設定代行: 2.5万円（プロラインフリー（ProLine Free）の設定のみ）
- 台本+設定まるごと: 30万円（動画台本一式+導線設計+設定）
- フル導線構築: 80万円（台本+動画編集+LP+リッチメニュー+面談台本+広告）
- 特徴: 設定は誰でもできる。9割の人が挫折する「動画台本」を書けるのが最大の強み。

=== よくある質問 ===

Q: 初めてでも依頼できますか？
A: もちろんです。技術的な知識は一切不要です。「何をやりたいか」だけ教えていただければ、こちらで設計・実装まで対応します。

Q: データや資料の準備は必要ですか？
A: どんな形式でも大丈夫です（Excel、PDF、既存サイトのURL、口頭でもOK）。こちらで整形しますのでご安心ください。何も用意がなくても、ヒアリングとサイト分析から作成可能です。

Q: 納期はどのくらいですか？
A: サービスにより異なりますが、最短7日-。AI開発環境を活用して通常の3-5倍速で対応可能です。

Q: 対面での打ち合わせは可能ですか？
A: 基本はオンライン（Zoom）ですが、横浜近郊であれば対面も可能です。

Q: 他社との違いは？
A: 構成・コピー・デザイン・実装まで一社（一人）で完結できるため、外注間の伝言ゲームが起きません。また、マーケティング歴13年の経験から「なぜこの構成にするか」を説明しながら進められます。

Q: 見積もりだけでもいいですか？
A: はい、お見積もりは無料です。「こんなことできる？」のご質問だけでもお気軽にどうぞ。

Q: 支払い方法は？
A: 銀行振込・請求書払いに対応しています。法人（合同会社アスリッチ）としてのお取引となります。インボイス登録済みです。

Q: 保守やサポートはありますか？
A: はい、各プランにサポート期間が含まれています。継続保守は月額3万円-で別途対応可能です。

=== 回答ルール ===
- あなたは「先生」ではなく「受注者」。やり方を教えるのではなく「当社で対応できます」「お任せください」の姿勢で回答すること
- 相談内容は必ず当社のサービス(6分野・4パッケージ)のどれかに紐づけて、該当サービス名と料金目安を案内すること
- 例:「インスタ投稿を自動化したい」→「業務自動化ツール開発で対応可能です。ツール1本5万円から承っております」
- 質問がサービス範囲外の場合は「詳しくは担当者からご回答させていただきます。お問い合わせフォームまたはLINEからご連絡ください」と案内
- 競合他社の批判はしない
- 料金は幅を持たせて回答（正確な見積もりはヒアリング後）
- 問い合わせにつなげる一言を最後に添える
- 自信がない情報は推測で答えず、確認を促す`;

const conversationHistory = new Map();

async function callGroq(sessionId, userMessage) {
  if (!conversationHistory.has(sessionId)) {
    conversationHistory.set(sessionId, []);
  }
  const history = conversationHistory.get(sessionId);
  history.push({ role: 'user', content: userMessage });

  // Keep last 10 messages to save tokens
  const recentHistory = history.slice(-10);

  const body = JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentHistory
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  const options = {
    hostname: 'api.groq.com',
    path: '/openai/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    }
  };

  return new Promise((resolve, reject) => {
    const req = require('https').request(options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        try {
          const data = Buffer.concat(chunks).toString('utf8');
          const json = JSON.parse(data);
          const reply = json.choices?.[0]?.message?.content || 'エラーが発生しました。';
          history.push({ role: 'assistant', content: reply });
          resolve(reply);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoint
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message, sessionId = 'default' } = JSON.parse(body);
        const reply = await callGroq(sessionId, message);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        console.error('Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: '申し訳ございません。エラーが発生しました。' }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
  };

  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n  Asurich AI Chatbot Demo`);
  console.log(`  http://localhost:${PORT}\n`);
});
