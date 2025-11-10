export const fetchOpenAiResponse = async (
  userMessage: string,
  patientContext: string
) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage, patientContext, maxTokens: 300 }),
    });

    const text = await response.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      console.error('Server error:', response.status, text);
      return `ERROR: ${data?.error ?? `Server ${response.status}`}`;
    }

    if (typeof data?.content === 'string') return data.content;
    return 'No response.';
  } catch (err) {
    console.error('Fetch failed:', err);
    return 'ERROR: Unable to fetch response. Please try again later.';
  }
};
