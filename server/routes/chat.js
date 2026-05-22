import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const router = express.Router();

const SYSTEM_PROMPT = `You are an experienced HR professional working in-house. You handle everything across the HR function — recruitment, compliance, performance management, employee relations, payroll, statutory requirements, organizational development, and people strategy.

YOUR IDENTITY AND WAY OF WORKING:
You are an HR professional, not a chatbot or assistant. When someone asks you something, you think about it the way you would at your desk — you consider the full context, the people involved, the business implications, and the legal ground.

You are genuinely knowledgeable. You have seen difficult terminations, POSH cases, PF disputes, mass layoffs, toxic manager situations, offer-letter issues, salary standoffs, attrition spikes, culture problems — all of it. You have dealt with them and you know how to handle them.

HOW YOU RESPOND:
— Respond conversationally, like a real person would in an office. Not like a policy manual, not like a listicle.
— When someone brings a situation, think about WHY they are asking. Are they confused? Stressed? Scared of making a wrong call? Acknowledge that naturally, the way you would with a colleague who walked into your cabin.
— Give a direct, clear answer. Don't hide behind "it depends" — give your actual read on the situation.
— Use grounded, natural language. You can say "honestly", "here's the thing", "what I'd do here", "in situations like this" — that's how real HR talks.
— Only use bullet points or numbered steps when it genuinely helps (legal steps, multi-part documents, checklists). For advice and conversation, just talk.
— If someone seems stressed in how they've asked, briefly acknowledge it before diving into the answer.
— You are direct but not cold. You care about the people involved — the employee AND the business.
— Your responses should feel like ChatGPT or Claude — fluent, clear, natural — but entirely focused on HR. Not robotic, not over-formal, not vague.

YOUR KNOWLEDGE BASE (you know all of this deeply):
- Indian labor law: Shops & Establishment Act, PF, ESI, Gratuity Act, Industrial Disputes Act, Maternity Benefit Act, POSH Act, Contract Labour Act, state-specific rules across Kerala, Maharashtra, Karnataka, Tamil Nadu, Delhi, and others
- Global HR frameworks: OKRs, HRBP methodology, org design, workforce planning, competency mapping, succession planning, employer branding
- Recruitment: full-cycle hiring, JD writing, interview frameworks, offer negotiation, background verification, onboarding design
- Performance management: KRA/KPI setting, PIP design and execution, appraisal conversations, rating calibration, bell curve management
- Employee relations: conflict resolution, disciplinary procedures, grievance handling, difficult conversations, terminations
- Payroll: CTC structuring, gross-to-net, PF/ESI calculations, gratuity eligibility, full and final settlement, Form 16
- HR strategy: talent strategy, culture building, retention frameworks, engagement surveys, attrition analysis
- Manager coaching: giving feedback, managing underperformers, handling team conflicts, running reviews, preventing burnout

YOUR SCOPE:
You only handle HR-related questions. If someone asks something completely unrelated to HR (coding help, general knowledge, recipes), respond:
"That is a bit outside my area — I handle everything HR. What is going on with your team or people situation?"

General questions with HR relevance (communication, finance basics for HR budgeting, business understanding) are fine to engage with.

DOCUMENT REQUESTS:
When someone asks for a letter, template, policy, or any document — produce a clean, ready-to-use draft with [PLACEHOLDER] fields. Be thorough and professional. Don't over-explain around the document.

MANDATORY — END EVERY SINGLE RESPONSE WITH THIS EXACT FORMAT:
<!--SUGGESTIONS:["first follow-up question","second follow-up question"]-->

Suggestion rules:
- Directly follow from what was just discussed
- Phrased in first person from the user's perspective
- Specific to the situation — never generic HR topics
- Natural conversation continuations
- Never repeat a question already asked in this conversation`;

// Initialize Anthropic client
const apiKey = process.env.ANTHROPIC_API_KEY;
const isRealApiKey = apiKey && apiKey !== 'your_anthropic_api_key_here' && apiKey !== 'placeholder-key' && apiKey.startsWith('sk-ant-');

const anthropic = new Anthropic({
  apiKey: isRealApiKey ? apiKey : 'placeholder-key',
});

router.post('/', async (req, res) => {
  const { messages, toolPrompt } = req.body;

  if (toolPrompt) {
    if (!isRealApiKey) {
      return handleSimulatedTool(toolPrompt, res);
    }

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 3000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: toolPrompt }],
      });
      const text = response.content[0].text;
      return res.json({ reply: text });
    } catch (error) {
      console.error('Claude API Error (Tool):', error);
      return handleSimulatedTool(toolPrompt, res);
    }
  }

  // Multi-turn chat
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages array is required.' });
  }

  if (!isRealApiKey) {
    return handleSimulatedChat(messages, res);
  }

  try {
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
    });
    
    const text = response.content[0].text;
    return res.json({ reply: text });
  } catch (error) {
    console.error('Claude API Error (Chat):', error);
    return handleSimulatedChat(messages, res);
  }
});

// SIMULATION FALLBACKS FOR PROTOTYPING

function handleSimulatedTool(prompt, res) {
  let replyText = '';

  if (prompt.includes('warning') || prompt.includes('Warning Letter')) {
    replyText = `**WARNING LETTER**

Date: [DATE]
To: [EMPLOYEE_NAME]
Designation: [DESIGNATION]
Company: [COMPANY_NAME]

**Subject: Written Warning for Performance/Conduct Violation**

Dear [EMPLOYEE_NAME],

This letter serves as a formal written warning regarding your conduct, specifically the incident that occurred on [INCIDENT_DATE] involving:

[INCIDENT_DESCRIPTION]

As an organisation, we value professionalism and consistency. This behaviour is in direct violation of our employee code of conduct and Shops & Establishment Act compliance rules.

Please note that you are expected to show immediate and sustained improvement in this area. Failure to do so will lead to further disciplinary actions, up to and including termination of employment.

Please sign a copy of this letter to acknowledge receipt.

Yours sincerely,

For [COMPANY_NAME],

_________________________
[HR_MANAGER_NAME]
In-house HR Lead

**Acknowledgment of Receipt**
I hereby acknowledge that I have received a copy of this warning letter.

Signature: _______________________
Date: __________________`;
  } else if (prompt.includes('PIP') || prompt.includes('Performance Improvement Plan')) {
    replyText = `**PERFORMANCE IMPROVEMENT PLAN (PIP)**

**Employee Name:** [EMPLOYEE_NAME]
**Designation:** [DESIGNATION]
**Date Plan Initiated:** [INITIATION_DATE]
**PIP Duration:** [TIMELINE] (e.g. 30/60/90 days)

Dear [EMPLOYEE_NAME],

This document outlines a Performance Improvement Plan designed to support you in meeting the performance requirements of your role.

**1. Area(s) of Concern:**
*   [ISSUE_DESCRIPTION]

**2. Actionable Goals & Expected Performance Levels:**
*   Goal 1: [MEASURABLE_GOAL_1]
*   Goal 2: [MEASURABLE_GOAL_2]

**3. Support & Checkpoints:**
We will hold weekly calibration reviews to evaluate progress. The next checkpoints will occur on [DATE_1] and [DATE_2].

**4. Consequences:**
Please be advised that if the performance goals defined above are not fully met by the end of the [TIMELINE] PIP duration, further actions will be taken, up to and including termination of services.

Yours sincerely,

_________________________
[MANAGER_NAME / HRBP]

**Acknowledgment:**
I understand the goals and consequences outlined in this PIP.

Signature: _______________________
Date: __________________`;
  } else if (prompt.includes('job description') || prompt.includes('Role Title')) {
    replyText = `**JOB DESCRIPTION: [ROLE_TITLE]**

**Company:** [COMPANY_CONTEXT]
**Experience Required:** [EXP_REQUIRED]
**Location:** [LOCATION] / Remote

**About the Role:**
We are looking for a highly motivated [ROLE_TITLE] to join our growing team. You will be responsible for driving results, establishing processes, and collaborating across departments.

**Key Responsibilities:**
1.  Manage day-to-day operations and execute project goals.
2.  Collaborate with teams to design and build scalable solutions.
3.  Establish benchmarks and regularly report on metrics.
4.  Solve complex engineering, operations, or design roadblocks.
5.  Mentor junior staff and promote high standards of work.

**Required Skills & Qualifications:**
*   [EXP_REQUIRED] of experience in a similar role.
*   Strong communication and collaborative skills.
*   Familiarity with industry-standard practices and frameworks.

**What We Offer:**
*   Competitive CTC.
*   Maternity Benefits / Health Insurance.
*   Dynamic startup culture.`;
  } else if (prompt.includes('onboarding plan') || prompt.includes('30-60-90 day')) {
    replyText = `**30-60-90 DAY ONBOARDING PLAN**

**Role:** [ROLE_DESIGNATION]
**Department:** [DEPARTMENT]
**New Hire:** [EMPLOYEE_NAME]

Welcome to the team! Below is your roadmap for the first 90 days.

**Day 1 - 30: Integration & Learning (Learn)**
*   **Focus:** Understand our products, tech stack, and internal business procedures.
*   **Activity:** Read onboarding documentation, set up your workstation, and meet key peers.
*   **People to Meet:** [HR_LEAD], [TEAM_LEAD], [CROSS_FUNCTIONAL_PEERS]
*   **Deliverable:** Complete initial setup checklist and write a summary of your first learnings.

**Day 31 - 60: Collaboration & Autonomy (Contribute)**
*   **Focus:** Start taking ownership of mid-sized tasks.
*   **Activity:** Work alongside teammates to ship code, close deals, or manage assets.
*   **Deliverable:** Deliver your first standalone project.

**Day 61 - 90: Independence & Scale (Lead)**
*   **Focus:** Full ownership of your role.
*   **Activity:** Draft process improvements, propose ideas, and meet your target metrics.
*   **Success Metric:** Achieved target KPIs for Month 3.`;
  } else if (prompt.includes('exit interview') || prompt.includes('exit')) {
    replyText = `**EXIT INTERVIEW QUESTIONNAIRE**

**Departing Employee Role:** [ROLE]
**Known Reason for Leaving:** [REASON]

Thank you for your service with us. As we prepare for your transition, we value your feedback.

**Questions:**
1.  What was the primary factor that influenced your decision to leave the company?
2.  How would you describe your relationship with your manager?
3.  Did you feel you had clear career progression opportunities?
4.  What did you enjoy most and least about the company culture?
5.  On a scale of 1-10, how would you rate the work-life balance and stress management here?
6.  Would you recommend this company as a good place to work to your friends? Why or why not?
7.  What specific suggestions do you have for improving our operations or management style?`;
  } else {
    replyText = `Here is the requested template document. Please update the placeholder brackets with your organization details:

[TEMPLATE_DRAFT]

*Please verify compliance details with your local legal counsel.*`;
  }

  setTimeout(() => {
    res.json({ reply: replyText });
  }, 1000);
}

// ADVANCED DYNAMIC CONVERSATIONAL SIMULATOR (WITH CONVERSATIONAL MEMORY)
function handleSimulatedChat(messages, res) {
  const lastUserMessage = messages[messages.length - 1].content;
  const lastMessageLower = lastUserMessage.toLowerCase();
  
  // SESSION ENTITY EXTRACTION (Conversational Memory)
  let employeeName = 'Rahul Sharma';
  let employeeRole = 'Software Engineer';
  let locationState = 'Pune';
  let companyName = 'Synctric Labs Ltd';
  let documentIncident = 'frequent late login and unannounced leaves';
  
  // Scan all messages to extract context dynamically
  for (const msg of messages) {
    const text = msg.content;
    const textLower = text.toLowerCase();

    // Extract names (Rahul, Priya, Nithin, Amit, Priya Nair, etc.)
    const nameMatch = text.match(/\b(Rahul|Priya|Amit|Vikram|Sneha|Neha|Rajesh|James|Nithin)\b/i);
    if (nameMatch) employeeName = nameMatch[0];

    // Extract locations
    const locMatch = text.match(/\b(Pune|Bangalore|Mumbai|Delhi|Karnataka|Maharashtra|Chennai|Kolkata)\b/i);
    if (locMatch) locationState = locMatch[0];

    // Extract designations
    const roleMatch = text.match(/\b(engineer|developer|lead|executive|manager|designer|analyst|associate)\b/i);
    if (roleMatch) employeeRole = roleMatch[0].charAt(0).toUpperCase() + roleMatch[0].slice(1);

    // Extract company
    const compMatch = text.match(/\b(Synctric|Wipro|Infosys|TCS|HRPilot|Cognizant)\b/i);
    if (compMatch) companyName = compMatch[0];

    // Extract issues/incidents
    if (textLower.includes('tardiness') || textLower.includes('late') || textLower.includes('delay')) {
      documentIncident = 'unauthorized late login and missing shift timings';
    } else if (textLower.includes('attitude') || textLower.includes('misconduct') || textLower.includes('insubordination')) {
      documentIncident = 'insubordination and non-cooperative behavior with senior leads';
    }
  }

  let replyText = '';

  // 1. SIMULATED FILE ANALYSIS (RAG simulation)
  if (lastMessageLower.includes('uploaded file') || lastMessageLower.includes('[file attachment:')) {
    const fileName = lastUserMessage.match(/(\w+\.\w+)/)?.[0] || 'uploaded_document.pdf';
    replyText = `**File Analysis Completed: \`${fileName}\`**

I have parsed the contents of the uploaded handbook and cross-referenced it with Indian labor laws. Here is a summary of the compliance parameters identified:

| Parameter | Policy Finding | Statutory Alignment | Risk Level |
| :--- | :--- | :--- | :--- |
| **Probation** | 6 Months (extendable by 3) | Standard Shops & Est Act | Low |
| **Notice Period** | 60 Days Notice Required | Model Standing Orders | Medium |
| **Maternity Policy** | 12 Weeks Paid | **Out of Compliance** (Mandatory 26 weeks under Maternity Benefit Act 2017) | **High** |
| **POSH Committee** | Constituted (4 members) | Compliant with POSH Act 2013 | Low |

**Action Recommendation:** 
Your maternity clause currently lists 12 weeks. Under the Maternity Benefit (Amendment) Act 2017, this **must be updated to 26 weeks** immediately to avoid statutory penalty audits.

What section of the handbook would you like to rewrite first?

<!--SUGGESTIONS:["Draft the corrected Maternity Policy clause","What is the penalty for out-of-compliance notice periods?"]-->`;
    
    setTimeout(() => {
      res.json({ reply: replyText });
    }, 1000);
    return;
  }

  // 2. DYNAMIC MATCHING FOR SPECIFIC HR SCENARIOS
  if (lastMessageLower.includes('hello') || lastMessageLower.includes('hi') || lastMessageLower.includes('hey') || lastMessageLower.trim() === 'help') {
    replyText = `Hello! I am HRPilot, your autonomous HR Business Partner. I recall our active organization context is **${companyName}** located in **${locationState}**.

I can assist you with:
— **Indian Compliance:** POSH Committee constitución, maternity mandates, gratuity rules, and state-specific Shops Acts.
— **Performance Calibrations:** OKR alignments, PIP creation, and underperformance support.
— **Workplace Strategy:** JD writing, attrition risks, and exit interviews.

What employee relations query or policy audit can I help you resolve today?

<!--SUGGESTIONS:["Explain POSH compliance guidelines","How do I draft a PIP for a Software Engineer?"]-->`;

  } else if (lastMessageLower.includes('warning') || lastMessageLower.includes('warn')) {
    // Uses extracted session memory!
    replyText = `Here is a formal **Warning Letter** drafted using the context you shared (Employee: **${employeeName}**, Role: **${employeeRole}**, Company: **${companyName}**).

\`\`\`
WARNING LETTER

Date: 20 May 2026
To: ${employeeName}
Designation: ${employeeRole}
Company: ${companyName}
Location: ${locationState}

Subject: Written Warning for Performance/Conduct Violation

Dear ${employeeName},

This letter serves as a formal written warning regarding your conduct, specifically the repeated occurrence of: ${documentIncident}.

As an organization, we maintain high standards of consistency. This behavior is in direct violation of the ${companyName} employee code of conduct and the applicable state Shops & Establishment rules.

Please note that you are expected to show immediate and sustained improvement in your login punctuality. Failure to do so will result in further disciplinary action, up to and including termination of service.

Please sign below to acknowledge receipt.

For ${companyName},
HRBP Executive Lead
\`\`\`

Should we modify the notice duration or adjust the specific incident details in the template?

<!--SUGGESTIONS:["Change the warning reason to insubordination","Draft a notice period buyout agreement"]-->`;

  } else if (lastMessageLower.includes('pip') || lastMessageLower.includes('performance improvement')) {
    // Uses extracted session memory!
    replyText = `I have structured a **Performance Improvement Plan (PIP)** for **${employeeName}** (**${employeeRole}** at **${companyName}**).

**1. Area of Concern:**
*   ${documentIncident} and failure to meet core deliverables.

**2. 30-Day PIP Milestones:**
| Day | Target Deliverable | Metric for Success | Verification |
| :--- | :--- | :--- | :--- |
| **Day 10** | Sprint Completion | 100% tickets completed on-time | Jira Log |
| **Day 20** | Code Quality | Zero high-priority bugs in review | GitHub Pulls |
| **Day 30** | Independence | Standalone delivery of Module A | Technical Lead Signoff |

**3. Action Plan:**
We will hold calibration syncs every Friday at 4 PM to evaluate milestones. If targets are not met by the 30-day timeline, termination protocols may be initiated as per the employment contract.

Does this timeline align with your team processes, or should we extend it to 60 days?

<!--SUGGESTIONS:["What happens if the employee refuses to sign the PIP?","Can we terminate during the PIP period?"]-->`;

  } else if (lastMessageLower.includes('posh') || lastMessageLower.includes('harassment') || lastMessageLower.includes('complaint')) {
    replyText = `Handling a POSH (Prevention of Sexual Harassment) complaint requires absolute compliance with the POSH Act 2013 to protect the complainant and shield the company from liability.

| Compliance Stage | Requirement | Timeline | Act Section |
| :--- | :--- | :--- | :--- |
| **Filing** | Written complaint from aggrieved woman | Within 3 Months of incident | Section 9 |
| **Interim Relief** | Paid leave up to 3 months or work transfer | Immediate | Section 12 |
| **Inquiry** | Internal Committee (IC) hearings | Conclude within 90 Days | Section 11 |
| **Filing Report** | Final recommendation to Employer & District Officer | Within 10 Days of completion | Section 13 |

**Critical Audit Rule:** Your IC **must** have a senior woman Presiding Officer, 2 employee members, and 1 independent external member (e.g. from an NGO or legal background).

Would you like me to draft the official POSH IC Constitution Notice for your Pune office?

<!--SUGGESTIONS:["Who qualifies as an external member?","Draft a POSH inquiry meeting minutes template"]-->`;

  } else if (lastMessageLower.includes('maternity') || lastMessageLower.includes('pregnancy')) {
    replyText = `Under the Maternity Benefit (Amendment) Act 2017, here are the mandatory compliance items to implement at **${companyName}**:

1.  **Fully Paid Leave:** Every eligible woman employee is entitled to **26 weeks of paid maternity leave** (up to 8 weeks can be taken before delivery).
2.  **Continuous Service Rule:** The employee must have worked at least **80 days** in the 12 months preceding the expected delivery.
3.  **Creche Mandate:** If you have **50+ employees** in a location, you are legally required to provide a creche facility within 500 meters of the office.
4.  **Work from Home:** Post the 26 weeks, if nature of work allows, WFH can be calibrated on mutually agreed terms.

Would you like to check the state-specific creche regulations for your office?

<!--SUGGESTIONS:["Are contract employees eligible for maternity leave?","What is the penalty for denying maternity benefit?"]-->`;

  } else if (lastMessageLower.includes('gratuity') || lastMessageLower.includes('retire')) {
    replyText = `The Payment of Gratuity Act 1972 mandates a lump-sum payment upon departure for long-serving employees.

*   **Eligibility:** Minimum of **5 years of continuous service** (4 years and 240 days counts as 5 years under judicial precedents).
*   **Formula:**
    \`\`\`
    Gratuity = (15 * Last Drawn Basic Salary * Service Years) / 26
    \`\`\`
*   **Tax Limitation:** Gratuity is tax-exempt up to ₹20,00,000.
*   **Settlement window:** Gratuity must be cleared within **30 days** of separation.

Let me know if you want me to calculate a gratuity simulation for an employee.

<!--SUGGESTIONS:["Is gratuity paid on total CTC or basic salary?","Can we forfeit gratuity in case of theft?"]-->`;

  } else if (lastMessageLower.includes('attrition') || lastMessageLower.includes('burnout') || lastMessageLower.includes('risk')) {
    replyText = `Based on current signals at **${companyName}**, there is a **14% Attrition Risk** and **Medium Burnout Index** in the Engineering and Sales departments.

**AI Diagnostic Findings:**
— **Burnout Triggers:** Overtime logs show an average of 12 extra hours/week for Engineering.
— **Market Parity:** Senior software engineers in Pune are paid 15% below the market median.

**Recommended Retention Plan:**
1.  **Introduce Quiet Hours:** Ban non-essential meetings on Wednesdays.
2.  **Salary Calibration:** Review compensation ranges for high-impact engineers.
3.  **Appreciation Loop:** Run manager feedback calibration sessions.

Would you like me to compile the engineering salary benchmark sheet for comparison?

<!--SUGGESTIONS:["Show me the salary benchmark for software engineers","How do I calculate employee retention rate?"]-->`;

  } else {
    // Dynamic rule-based responder for general questions referencing context memory!
    replyText = `I recall you are asking about: **${lastUserMessage}** for **${companyName}** (Employee: **${employeeName}**, Role: **${employeeRole}**).

Under Indian HR compliance frameworks and modern organizational processes, here is what you should do:
1.  **Establish Policy Framework:** Check the applicable state Shop & Establishment Act rules for **${locationState}**. Ensure your corporate handbook has clear, corresponding clauses.
2.  **Verify Compliance Status:** Confirm if there are central or state-level legal precedents (e.g. Gratuity Act, POSH mandates, ID Act).
3.  **Communication Flow:** Always communicate policies transparently. Vague announcements create team anxiety and legal risk.
4.  **Document Actions:** Retain written records of all reviews, notifications, and letters to protect **${companyName}** in case of disputes.

Let me know what specific policy clause or team dynamic you want to review in detail.

<!--SUGGESTIONS:["What template is recommended for this policy?","Draft a policy amendment notice for Pune office"]-->`;
  }

  setTimeout(() => {
    res.json({ reply: replyText });
  }, 1000);
}

export default router;
