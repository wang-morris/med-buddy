export const fetchOpenAiResponse = async (userMessage: string) => {
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
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 150,
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
