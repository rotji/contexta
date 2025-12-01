import { Request, Response } from 'express';

// For MVP, just echo back a smart response. Replace with real AI logic later.
export async function getAiResponse(req: Request, res: Response) {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'Transcript required' });

  // Smart template-based response generator
  const templates = [
    "Based on your discussion, have you considered alternative perspectives?",
    "It sounds like you're weighing important options. My suggestion: focus on what aligns with your long-term goals.",
    "Given the context, a balanced approach might be best. What are the pros and cons you've identified so far?",
    "Interesting point! Sometimes, taking a step back and reviewing priorities can help clarify the next move.",
    "If I were part of this conversation, I'd recommend open communication and considering all stakeholders' views.",
    "This topic has many layers. Have you explored possible unintended consequences?",
    "A creative solution could be to combine the best aspects of each option discussed.",
    "Remember, the best decisions often come from collaboration and listening to all sides.",
    "If you're unsure, gathering more information or taking a short break might help.",
    "Great discussion! Is there a way to test your ideas on a small scale before committing fully?"
  ];
  // Pick a random template for demo
  const aiResponse = templates[Math.floor(Math.random() * templates.length)];
  res.json({ aiResponse });
}
