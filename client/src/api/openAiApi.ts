export const fetchOpenAiResponse = async (
  userMessage: string,
  patientContext: string
) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are MedBuddy, an AI assistant designed for doctors, nurses, and other healthcare professionals.
              - Your goal is to provide quick medical references and reminders.
              - You assist with medications, prescriptions, dosages, diseases, symptoms, treatment recommendations or related topics the user inquires about.
              - Keep responses concise, accurate, and clinically relevant.
              - When possible, use peer reviewed sources to find answers
              - **Do not provide personal medical advice. Instead, if a user asks for specific treatment decisions, politely remind them to use clinical judgment. Instead of saying something such as "This patient has pneumonia", instead say something such as "This patient may have pneumonia". Do not say statements such as "Prescribe 500mg Amoxicillin", instead say something such as "The typical procedure would be to prescribe 500mg Amoxicillin"**.
              - Keep answers under 200 tokens in length.
              - If the answer to the user's questions cannot be found, send a polite message similar to "Unfortunately, I am unable to assist with this topic. Please add additional patient context or rephrase your question and I will try finding an answer for you."`,
          },
          {
            role: 'user',
            content: `Patient Context: ${patientContext}\n\nQuestion: ${userMessage}`,
          },
        ],
        max_tokens: 250,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error fetching OpenAI response');
    }

    return data.choices?.[0]?.message?.content || 'No response from OpenAI.';
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return 'Error: Unable to fetch response from AI.';
  }
};
