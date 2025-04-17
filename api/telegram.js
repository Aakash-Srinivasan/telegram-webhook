// api/telegram.js

export default async function handler(req, res) {
    const { feedback_text } = req.body;
  
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
    if (!feedback_text) {
      return res.status(400).json({ error: 'Missing feedback_text' });
    }
  
    const message = `📝 New Feedback:\n${feedback_text}`;
  
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
    try {
      const telegramRes = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
  
      const json = await telegramRes.json();
  
      if (!telegramRes.ok) {
        return res.status(500).json({ error: json });
      }
  
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  