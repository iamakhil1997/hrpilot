const STORAGE_KEY = 'hrpilot-knowledge-v1';
const MAX_FILE_BYTES = 1024 * 1024;
const MAX_FILES = 20;
const MAX_TOTAL_CHARS = 2_000_000;

const STOP_WORDS = new Set([
  'about', 'after', 'again', 'also', 'and', 'any', 'are', 'can', 'could', 'does', 'for',
  'from', 'have', 'how', 'into', 'our', 'please', 'should', 'that', 'the', 'their',
  'them', 'then', 'there', 'this', 'was', 'what', 'when', 'where', 'which', 'who',
  'will', 'with', 'would', 'you', 'your', 'policy',
]);

export function loadKnowledgeDocuments() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(doc => doc?.id && doc?.name && doc?.text) : [];
  } catch {
    return [];
  }
}

function saveDocuments(documents) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
}

function cleanText(text) {
  return text.replace(/\u0000/g, '').replace(/\r/g, '').replace(/[\t ]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

export async function addKnowledgeFiles(files) {
  const existing = loadKnowledgeDocuments();
  if (existing.length + files.length > MAX_FILES) throw new Error(`Keep up to ${MAX_FILES} documents in your knowledge base.`);

  const added = [];
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) throw new Error(`${file.name} is over the 1 MB per-file limit.`);
    if (!/\.(txt|md|csv|json)$/i.test(file.name)) throw new Error(`${file.name}: upload TXT, Markdown, CSV, or JSON files.`);
    const text = cleanText(await file.text());
    if (!text) throw new Error(`${file.name} does not contain readable text.`);
    added.push({ id: crypto.randomUUID(), name: file.name, text, addedAt: Date.now() });
  }

  const next = [...existing, ...added];
  const total = next.reduce((sum, doc) => sum + doc.text.length, 0);
  if (total > MAX_TOTAL_CHARS) throw new Error('The knowledge base has reached its 2 MB text limit. Remove a document before adding more.');
  saveDocuments(next);
  return next;
}

export async function addIndiaHRStarterPack() {
  const id = 'hrpilot-india-hr-starter-pack-v1';
  const response = await fetch('/knowledge/india-hr-starter-pack.md');
  if (!response.ok) throw new Error('The India HR starter pack could not be downloaded. Please try again later.');

  const text = cleanText(await response.text());
  if (!text) throw new Error('The India HR starter pack is empty.');

  const documents = loadKnowledgeDocuments();
  const document = {
    id,
    name: 'India HR starter pack — official sources (reviewed 23 Oct 2026).md',
    text,
    addedAt: Date.now(),
  };
  const next = documents.some(item => item.id === id)
    ? documents.map(item => item.id === id ? document : item)
    : [...documents, document];

  if (next.length > MAX_FILES) throw new Error(`Keep up to ${MAX_FILES} documents in your knowledge base.`);
  if (next.reduce((sum, item) => sum + item.text.length, 0) > MAX_TOTAL_CHARS) {
    throw new Error('The knowledge base has reached its 2 MB text limit. Remove a document before adding more.');
  }

  saveDocuments(next);
  return next;
}

export function removeKnowledgeDocument(id) {
  const next = loadKnowledgeDocuments().filter(doc => doc.id !== id);
  saveDocuments(next);
  return next;
}

export function clearKnowledgeDocuments() {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}

function splitChunks(text) {
  const paragraphs = text.split(/\n\s*\n/).map(part => part.trim()).filter(Boolean);
  const chunks = [];
  let current = '';
  for (const paragraph of paragraphs) {
    if (paragraph.length > 1500) {
      if (current) chunks.push(current);
      current = '';
      for (let index = 0; index < paragraph.length; index += 1300) chunks.push(paragraph.slice(index, index + 1500));
      continue;
    }
    if (current && current.length + paragraph.length > 1500) {
      chunks.push(current);
      current = '';
    }
    current += `${current ? '\n\n' : ''}${paragraph}`;
  }
  if (current) chunks.push(current);
  return chunks;
}

export function retrieveKnowledge(query, documents) {
  const terms = [...new Set((query.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || []).filter(term => !STOP_WORDS.has(term)))];
  if (!terms.length) return '';

  const candidates = documents.flatMap(doc => splitChunks(doc.text).map((content, index) => {
    const normalized = content.toLowerCase();
    const hits = terms.reduce((sum, term) => sum + (normalized.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 0);
    return { name: doc.name, index, content, hits };
  })).filter(chunk => chunk.hits > 0).sort((a, b) => b.hits - a.hits).slice(0, 4);

  if (!candidates.length) return '';
  return candidates.map((chunk, index) => `[${index + 1}] ${chunk.name} (section ${chunk.index + 1})\n${chunk.content}`).join('\n\n');
}
