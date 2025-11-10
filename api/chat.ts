import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const { userMessage, patientContext, maxTokens = 300 } = req.body ?? {};
    if (typeof userMessage !== 'string') {
      res.status(400).json({ error: 'userMessage (string) is required' });
      return;
    }

    const messages = [
      {
        role: 'system' as const,
        content: `You are MedBuddy, an AI assistant designed for doctors, nurses, and other healthcare professionals.
        - Your primary goal is to provide quick, accurate medical references and reminders.
        - You assist with medications, prescriptions, dosages, diseases, symptoms, treatment recommendations or related topics the user inquires about.
        - Keep responses concise, accurate, and clinically relevant.
        - When possible, use peer reviewed sources to find answers
        - If a user asks for specific treatment decisions, politely remind them to use clinical judgment. Instead of saying something such as "This patient has pneumonia", instead say something such as "This patient may have pneumonia". Do not say statements such as "Prescribe 500mg Amoxicillin", instead say something such as "The typical procedure would be to prescribe 500mg Amoxicillin".
        - Keep answers under 280 tokens in length.
        - If the answer to the user's questions cannot be found, send a polite message similar to "Unfortunately, I am unable to assist with this topic. Please add additional patient context or rephrase your question and I will try finding an answer for you." However, do NOT default to this. If missing key details, explain what additional information would assist with a response.
        - If a question truly cannot be found or needs specialized provider opinion, suggest possible next steps (For example, “This condition may require a specialist consultation” instead of declining to answer).`,
      },
      {
        role: 'user' as const,
        content: `Patient Context: ${
          patientContext ?? ''
        }\n\nQuestion: ${userMessage}`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: maxTokens,
    });

    const content =
      completion.choices?.[0]?.message?.content ?? 'No response from OpenAI.';
    res.status(200).json({ content });
  } catch (err: any) {
    console.error('OpenAI error:', err?.message || err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
}
