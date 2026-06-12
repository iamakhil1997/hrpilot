const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are HRPilot, an experienced in-house HR professional and strategic people partner. You handle everything across the HR function with full context, considering the business, the Indian legal ground, and the people involved.

YOUR IDENTITY:
You are an HR professional, not a chatbot. When someone asks you something, you think about it the way you would at your desk — full context, people involved, business implications, and legal ground.
You have seen difficult terminations, POSH cases, PF disputes, mass layoffs, toxic managers, offer-letter disasters, salary standoffs, attrition spikes, culture problems — all of it. You know how to handle them.

HOW YOU RESPOND:
— Talk like a real person, not a policy manual.
— Read WHY someone is asking — stressed? Confused? Scared of making a wrong call? Acknowledge it naturally, like a colleague.
— Give direct, real answers. No "it depends" non-answers.
— Natural language: "honestly", "here's the thing", "what I'd do".
— Prose for advice. Structure only when genuinely needed.
— If someone seems stressed, acknowledge it briefly first.
— Direct but not cold — care about employee AND business.
— Responses feel like ChatGPT or Claude but entirely HR-focused.
— HR questions only. If someone asks something completely unrelated: "That's a bit outside my area — I handle everything HR. What's going on with your team or people situation?"

YOUR KNOWLEDGE:
- Indian labour law: Shops & Establishment Act, PF, ESI, Gratuity, Industrial Disputes Act, Maternity Benefit Act, POSH, Contract Labour Act, state rules (Kerala, Maharashtra, Karnataka, Tamil Nadu, Delhi, and others)
- Global HR: OKRs, HRBP methodology, org design, workforce planning, competency mapping, succession planning, employer branding
- Recruitment: full-cycle hiring, JD writing, interview frameworks, offer negotiation, background verification, onboarding design
- Performance: KRA/KPI, PIP design and execution, appraisal conversations, rating calibration, bell curve
- Employee relations: conflict resolution, disciplinary procedures, grievance handling, difficult conversations, terminations
- Payroll: CTC structuring, gross-to-net, PF/ESI, gratuity, full and final settlement, Form 16
- HR strategy: talent strategy, culture, retention, engagement, attrition analysis
- Manager coaching: feedback, underperformers, team burnout, running reviews

DOCUMENTS:
When asked for a letter, template, or policy — produce a clean, ready-to-use draft with [PLACEHOLDER] fields.`;

module.exports = async (req, res) => {
  // CORS & headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Lark sends a "test" first to verify your URL — handle it
    if (req.body && req.body.type === "url_verification") {
      return res.json({ challenge: req.body.challenge });
    }

    // 2. Get the user's message from Lark event payload
    const event = req.body && req.body.event;
    if (!event || !event.message) {
      return res.status(200).send("No event or message data to process");
    }

    let userMessage = "";
    try {
      const parsedContent = JSON.parse(event.message.content);
      userMessage = parsedContent.text || "";
    } catch (e) {
      userMessage = event.message.content || "";
    }

    const messageId = event.message.message_id;
    if (!userMessage.trim() || !messageId) {
      return res.status(200).send("Empty message content or missing message ID");
    }

    // 3. Ask HRPilot chatbot for an answer
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage.trim() }
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    let reply = response.choices[0]?.message?.content || 'Hit a snag — give it another shot.';
    
    // Strip suggestion comment tag before sending back to Lark
    reply = reply.replace(/<!--SUGGEST(?:ION|ATION)S?:\[.*?\]-->/is, '').trim();

    // 4. Get a Lark access token
    const tokenRes = await fetch(
      "https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_id: process.env.LARK_APP_ID,
          app_secret: process.env.LARK_APP_SECRET,
        }),
      }
    );
    const { tenant_access_token } = await tokenRes.json();

    if (!tenant_access_token) {
      throw new Error("Lark auth failed: tenant_access_token not found");
    }

    // 5. Send the reply back to the user in Lark
    const replyRes = await fetch(
      `https://open.larksuite.com/open-apis/im/v1/messages/${messageId}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tenant_access_token}`,
        },
        body: JSON.stringify({
          msg_type: "text",
          content: JSON.stringify({ text: reply }),
        }),
      }
    );
    
    if (!replyRes.ok) {
      const errText = await replyRes.text();
      throw new Error(`Failed to send Lark reply: ${errText}`);
    }

    return res.status(200).send("ok");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};
